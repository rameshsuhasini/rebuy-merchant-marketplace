import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Offer } from '../models/offer.model';

interface DummyProduct {
  id: number;
  title: string;
  description: string;
  price: number;
  rating: number;
  brand: string;
  thumbnail: string;
}

interface DummyProductsResponse {
  products: DummyProduct[];
  total: number;
  skip: number;
  limit: number;
}

@Injectable({
  providedIn: 'root',
})
export class OfferApiService {
  private readonly baseUrl = 'https://dummyjson.com';

  constructor(private http: HttpClient) {}

  /** Fetch list of offers from DummyJSON and map to Offer[] */
  getOffers(): Observable<Offer[]> {
    return this.http
      .get<DummyProductsResponse>(`${this.baseUrl}/products?limit=20`)
      .pipe(map((res) => res.products.map((p) => this.mapProductToOffer(p))));
  }

   /** Adapter: DummyJSON product → internal Offer model */
  private mapProductToOffer(product: DummyProduct): Offer {
    return {
      id: product.id,
      title: product.title,
      description: product.description,
      price: product.price,
      rating: product.rating,
      merchant: product.brand,
      imageUrl: product.thumbnail,
      // For MVP, generate a pseudi-random votes count so we can sort:
      votes: this.generateVotes(product.id),
      //Simalte "buy on rebuy" link - in real app this would come from backend.
      purchaseUrl: `https://www.rebuy.de/product/${product.id}`,
    };
  }

    private generateVotes(id: number): number {
        // Simple deterministic-ish "random" based on id.
    return (id * 7) % 50;
  }
}
