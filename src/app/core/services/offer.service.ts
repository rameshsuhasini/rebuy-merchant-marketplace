import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Offer } from '../models/offer.model';
import { OfferApiService } from '../api/offer-api.service';

@Injectable({
  providedIn: 'root',
})
export class OfferService {
  private offersSubject = new BehaviorSubject<Offer[] | null>(null);
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
        this.offersSubject.next(offers);
        this.loadingSubject.next(false);
      },
      error: () => {
        this.loadingSubject.next(false);
      },
    });
  }

  getOffersSortedByVotes(): Observable<Offer[]> {
    return this.offers$.pipe(
      map((offers) => [...(offers ?? [])].sort((a, b) => b.votes - a.votes))
    );
  }

    /** Get a single offer from in-memory state */
  getOfferById(id: number): Observable<Offer | undefined> {
    return this.offers$.pipe(
      map((offers) => offers?.find((o) => o.id === id))
    );
  }

  upvote(id: number): void {
    this.updateVotes(id, +1);
  }

    downvote(id: number): void {
    this.updateVotes(id, -1);
  }

  private updateVotes(id: number, delta: number): void {
    const current = this.offersSubject.getValue();
    if (!current) return;

    const updated = current.map((offer) => 
        offer.id === id ? { ...offer, votes: offer.votes + delta} : offer
    )
    this.offersSubject.next(updated)
  }


}
