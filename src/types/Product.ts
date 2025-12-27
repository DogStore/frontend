export interface Product {
  id: string;      // mapped from _id
  name: string;
  image: string;
  price: number;
  originalPrice?: number;
  rating: number;
  countryFlag?: string | null;

  isFavorite: boolean;
  inCart: boolean;
  addedAt?: number; // timestamp
}
