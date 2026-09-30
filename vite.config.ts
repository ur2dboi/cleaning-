import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import leadHandler from './api/lead.js';

// Same-origin development endpoint mirrors the Vercel serverless function.
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  for (const key of ['APPSCRIPT_URL', 'APPSCRIPT_SECRET']) {
    if (!process.env[key] && env[key]) process.env[key] = env[key];
  }
  return {
    plugins: [react(), {
      name: 'local-form-api',
      configureServer(server) {
        server.middlewares.use('/api/lead', async (req, res) => {
          const response: any = res;
          response.status = (code: number) => { res.statusCode = code; return response; };
          response.json = (data: unknown) => { res.setHeader('Content-Type', 'application/json'); res.end(JSON.stringify(data)); };
          let size = 0;
          const chunks: Buffer[] = [];
          try {
            for await (const chunk of req) {
              size += chunk.length;
              if (size > 1024 * 1024) { response.status(413).json({ ok: false, message: 'Your request is too large.' }); return; }
              chunks.push(Buffer.from(chunk));
            }
            (req as any).body = Buffer.concat(chunks).toString('utf8');
            await leadHandler(req, response);
          } catch { response.status(500).json({ ok: false, message: 'Your request could not be confirmed.' }); }
        });
      },
    }],
    server: { host: '0.0.0.0', port: 5173, strictPort: true, allowedHosts: true },
    preview: { host: '0.0.0.0', port: 5173, strictPort: true, allowedHosts: true },
  };
});
