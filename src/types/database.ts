export interface Material {
  id: number;
  slug: string;
  name: string;
  short_name: string;
  title: string;
  description: string;
  image_url: string;
}

export interface Artisan {
  id: number;
  slug: string;
  full_name: string;
  brand_name: string;
  dni?: string | null;
  phone: string;
  instagram?: string | null;
  address?: string | null;
  locality?: string | null;
  experience_years?: string | null;
  materials_text: string;
  material_id?: number | null;
  techniques?: string | null;
  short_bio: string;
  history_text: string;
  avatar_url: string;
  story_image_url?: string | null;
  production_photos: string[];
  status: string;
}

export interface Catalog {
  id: number;
  artisan_id: number;
  title: string;
}

export interface Product {
  id: number;
  slug: string;
  artisan_id: number;
  catalog_id?: number | null;
  material_id: number;
  name: string;
  subtitle?: string | null;
  category_type: 'utilitario' | 'decorativo';
  piece_section: string;
  piece_type: 'fija' | 'variable';
  dimensions: string;
  weight?: string | null;
  work_hours: string;
  material_label: string;
  technique: string;
  short_description: string;
  stock: number;
  price?: number | null;
  main_image_url: string;
  gallery_urls: string[];
  is_featured: boolean;
}

export interface BuyerAccountInput {
  full_name: string;
  email: string;
  phone: string;
  password?: string;
  accepted_terms: boolean;
}

export interface ArtisanRegistrationInput {
  full_name: string;
  password?: string;
  dni: string;
  phone: string;
  materials_text: string;
  material_id: number;
  locality: string;
  instagram: string;
  experience_years: string;
  brand_name: string;
  techniques: string;
  production_photos: string[];
}

