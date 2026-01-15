export interface Product {
  id: number;
  name: string;
  price: number;
  category: "food" | "cloth" | "toy";
  country: "Cambodia" | "France" | "Australia";
  image?: string;     
  flag?: String;
  star?: String; 
  reviews?: Review[];    
  slug: String;        

  // For product details page
  images?: string[];            
  rating?: number;
  variants?: {
    label: string;
    price: number;
  }[];
  reviewCount?: number;
  description?: string;
}

export interface Review{
  id: number;
  author: String;
  rating: number;
  comment: String;
  date: string;
}