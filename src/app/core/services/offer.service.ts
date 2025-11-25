import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Offer } from '../models/offer.model';
import { OfferApiService } from '../api/offer-api.service';

@Injectable({
  providedIn: 'root',
})
export class OfferService {
  private offersSubject = new BehaviorSubject<Offer[]>([]);
  offers$ = this.offersSubject.asObservable();

  private loadingSubject = new BehaviorSubject<boolean>(false);
  loading$ = this.loadingSubject.asObservable();

  constructor(private offerApiService: OfferApiService) {
    this.loadOffers();
  }

  private loadOffers(): void {
    this.loadingSubject.next(true);
    this.offerApiService.getOffers().subscribe({
      next: (offers) => {
        this.offersSubject.next(offers ?? []);
        this.loadingSubject.next(false);
      },
      error: (err) => {
        console.error('Failed to load offers', err);
        this.loadingSubject.next(false);
      },
    });
  }

  /** Sorted by votes downvotes */
  getOffersSortedDesc(): Observable<Offer[]> {
    return this.offers$.pipe(
      map((offers) => [...offers].sort((a, b) => b.votes - a.votes))
    );
  }

    /** Sorted by votes upvotes */
  getOffersSortedAsc(): Observable<Offer[]> {
    return this.offers$.pipe(
      map((offers) => [...offers].sort((a, b) => a.votes - b.votes))
    );
  }

  /** Get a single offer from in-memory state */
  getOfferById(id: number): Observable<Offer | undefined> {
    return this.offers$.pipe(map((offers) => offers?.find((o) => o.id === id)));
  }

  upvote(id: number): void {
    this.updateVotes(id, +1);
  }

  downvote(id: number): void {
    this.updateVotes(id, -1);
  }

  private updateVotes(id: number, delta: number): void {
    this.offerApiService.updateVotes(id, delta).subscribe({
      next: (updatedOffer) => {
        const current = this.offersSubject.value;
        if (!current) return;

        const updated = current.map((offer) =>
          offer.id === id ? updatedOffer : offer
        );
        this.offersSubject.next(updated);
      },
      error: (err) => {
        console.error('Failed to update votes', err);
      },
    });
  }
}
