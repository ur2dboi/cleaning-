export type ServiceCategory = 'residential' | 'commercial' | 'post-construction' | 'junk-removal';
export type PageRoute = 'home' | 'services' | 'residential' | 'commercial' | 'post-construction' | 'junk-removal' | 'quote' | 'booking' | 'about' | 'contact';

export interface Testimonial {
  id: string;
  author: string;
  role: string;
  location: string;
  category: ServiceCategory;
  rating: number;
  content: string;
  date: string;
}

export interface ChecklistItem {
  category: string;
  tasks: string[];
}
