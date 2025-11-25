import { Component, ChangeDetectionStrategy } from '@angular/core';
import { OfferCardComponent } from '../../../../shared/components/offer-card/offer-card.component';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Offer } from '../../../../core/models/offer.model';
import { OfferApiService } from '../../../../core/api/offer-api.service';
@Component({
  selector: 'app-offers-list-page',
  standalone: true,
  imports: [CommonModule, OfferCardComponent, RouterModule],
  templateUrl: './offers-list-page.component.html',
  styleUrl: './offers-list-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OffersListPageComponent {
  offers$: Observable<Offer[]> = this.offerApi
    .getOffers()
    .pipe(map((offers) => [...offers].sort((a, b) => b.votes - a.votes)));

  constructor(private offerApi: OfferApiService,
     private router: Router) {}

     trackById(index: number, offer: Offer): number {
      return  offer.id;
     }

     OnUpVote(id: number): void {
      console.log('Upvote', id);
     }
      OnDownVote(id: number): void {
      console.log('Upvote', id);
     }
      OnViewDetails(id: number): void {
      console.log('Upvote', id);
       this.router.navigate(['/offers', id]);
     }
}
