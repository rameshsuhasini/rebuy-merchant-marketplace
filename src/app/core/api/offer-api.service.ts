import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Offer } from '../models/offer.model';

@Injectable({
  providedIn: 'root',
})
export class OfferApiService {
  private readonly baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getOffers(): Observable<Offer[]> {
    return this.http.get<Offer[]>(`${this.baseUrl}/offers`);
  }

  getOfferById(id: number): Observable<Offer> {
    return this.http.get<Offer>(`${this.baseUrl}/offers/${id}`);
  }

  updateVotes(id: number, delta: number): Observable<Offer> {
    return this.http.patch<Offer>(`${this.baseUrl}/offers/${id}/vote`, {
      delta,
    });
  }
}
