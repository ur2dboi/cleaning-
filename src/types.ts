export type ServiceCategory = 'residential' | 'commercial' | 'post-construction';
export type PageRoute = 'home' | 'services' | 'residential' | 'commercial' | 'post-construction' | 'quote' | 'booking' | 'about' | 'contact' | 'hvac' | 'junk-removal';

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
