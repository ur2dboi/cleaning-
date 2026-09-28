# Jitto Cleaning Services — Official Website

> **A Cleaner Space. More Time For What Matters.**  
> Residential • Commercial • Post-Construction Cleaning  
> Proudly serving Barrie & Simcoe County, Ontario  
> **24/7 Hotline:** (249) 800-0127 | **Email:** info@jittogroups.ca  
> **Status:** Now Accepting New Clients

---

## 🌟 Overview

This website is custom-engineered for **Jitto Cleaning Services**, speaking directly to three distinct customer segments through dedicated interactive pathways:

1. **Residential Cleaning (Homeowners & Families)**: Warm, trustworthy housekeeping, recurring maintenance, deep resets, and move-in/move-out turnover cleans.
2. **Commercial & Janitorial (Offices, Clinics & Retail)**: Professional corporate presentation, hospital-grade clinic sanitization, after-hours flexibility, and customized service agreements.
3. **Post-Construction Detailing (Builders, General Contractors & Renovators)**: Turnkey dust & debris eradication, HEPA air filtration, paint/sticker scraping, and time-stamped photo verification logs ready for handover and occupancy inspections.
4. **Coming Soon Services**: Dedicated showcases and early waitlist inquiries for **HVAC Air Duct Cleaning** and **Junk & Debris Removal**.

---

## 📄 Site Structure & Pages (6 Core Pages + Dedicated Sub-Paths)

1. **Home (`/` or `#/home`)**:
   - High-impact hero section with official Jitto logo and badges.
   - **Three Big Path-Picker Boxes near the top** directing visitors seamlessly to Residential, Commercial, or Post-Construction.
   - Quick interactive quote teaser.
   - The **7 Pillars of Why Choose Jitto** (16 years hands-on housekeeping, single team for all needs, room-by-room checklists, proof not promises, same crew, direct owner access, local and accountable).
   - Uniformed team gallery with authentic photos in navy Jitto polos.
   - Verified local reviews & testimonials.
   - Service area coverage across Simcoe County.
   - 24/7 call and booking CTA banner.

2. **Services (`#/services`)**:
   - Master catalog with interactive category switcher.
   - Deep-dive cards for each package with room-by-room checklist previews.
   - "Why Jitto vs Standard Cleaners" feature matrix.
   - "Coming Soon" teasers for HVAC Air Duct Sanitation & Junk Hauling with early notification signup.

3. **Dedicated Service Landing Pages**:
   - **Residential (`#/residential`)**: Homeowner sanctuary focus, room-by-room checklist breakdown.
   - **Commercial (`#/commercial`)**: Office & clinic sanitation, after-hours contracts, security protocols.
   - **Post-Construction (`#/post-construction`)**: 3-phase workflow (Rough, Final, Handover Touch-Up), inspection readiness.

4. **Quotation Form (`#/quote`)**:
   - Smart dynamic quote generator that starts with *"Which service do you need?"*:
     - **Residential**: Selects bedrooms, bathrooms, home square footage, cleaning frequency (weekly, bi-weekly, monthly, deep, move-in/out), and specialty add-ons.
     - **Commercial**: Selects facility type (office, clinic, retail), commercial square footage, preferred cleaning hours (after-hours, daytime porter, weekends), and schedule frequency.
     - **Post-Construction**: Selects project type, size (sq ft), construction phase, target finish date, dust severity level, and features a **job site photo / blueprint upload zone**.
   - Real-time dynamic price calculation range in CAD.
   - Reference ID generation (e.g. `JITTO-QT-8421`) and celebratory confetti effect.

5. **Booking Form (`#/booking`)**:
   - Complete scheduling flow with date selection, 24/7 time slot options (morning, afternoon, evening, overnight), property access methods (lockbox, someone home, concierge), and instant booking confirmation ID.

6. **About Us (`#/about`)**:
   - The founding story: 16+ years of private estate housekeeping experience.
   - Why Jitto started: solving the problem of unreliable cleaning where clients had to chase, inspect, or manage rotating strangers.
   - The 7 core pillars written with authentic detail.
   - Trust signals: Fully insured, WSIB covered, 100% background-checked team, local accountability.
   - Official uniform standards (navy polo with embroidered Jitto emblem).

7. **Contact Us (`#/contact`)**:
   - Direct founder phone line: `(249) 800-0127` (clickable).
   - Email: `info@jittogroups.ca`.
   - 24/7 Emergency & Urgent Handover hotline callout.
   - Direct message contact form.
   - Interactive FAQ accordion.

---

## 🎨 Brand Design System

- **Primary Navy:** `#012D6C` (Navy 700), `#061735` (Navy 900), `#030C1C` (Navy 950)
- **Primary Cyan:** `#00C2CB` (Cyan 500), `#039FA7` (Cyan 600), `#75E5EC` (Cyan 300)
- **Official Uniform:** Dark navy polo shirt with official Jitto embroidered chest emblem.
- **Typography:** Serif headings (`Playfair Display`, `Georgia`) combined with clean sans-serif UI (`Inter`, `system-ui`).

---

## 🚀 Running Locally

```bash
# 1. Install dependencies
npm install

# 2. Start the local development server
npm run dev
```

The site will be live at `http://localhost:5173`.

---

## 🚢 Deploying to Vercel

### Method 1: Vercel Git Integration (Recommended)
1. Push this repository to GitHub.
2. In [Vercel](https://vercel.com), click **Add New Project** and import your GitHub repository.
3. Vercel will automatically detect **Vite** and configure the build command (`npm run build`) and output directory (`dist`).
4. Click **Deploy**. The included `vercel.json` ensures all routes and deep links work out-of-the-box!

### Method 2: Vercel CLI
```bash
npm install -g vercel
vercel
```

---

## 🐙 Deploying to GitHub & GitHub Pages

1. Initialize git and commit:
```bash
git init
git add .
git commit -m "Initial commit of Jitto Cleaning Services website"
git branch -M main
git remote add origin https://github.com/your-username/jitto-cleaning.git
git push -u origin main
```

2. For GitHub Pages, run `npm run build` and deploy the `dist/` directory via GitHub Actions or the `gh-pages` package.

---

## 📞 Business Contact

- **Company:** Jitto Cleaning Services
- **Phone:** (249) 800-0127 (24/7 Hotline)
- **Email:** info@jittogroups.ca
- **Service Hub:** Barrie, Innisfil, Orillia, Bradford, Collingwood, Wasaga Beach, Simcoe County, ON
