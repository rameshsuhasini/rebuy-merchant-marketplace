// Defining an interface for an Offer Object
export interface Offer {
  id: number;
  title: string;
  description: string;
  price: number;
  votes: number;
  rating: number;      // 1–5
  merchant: string;
  imageUrl?: string;
  purchaseUrl: string;
}
