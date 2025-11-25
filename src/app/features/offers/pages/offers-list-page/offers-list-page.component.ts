import { Component, ChangeDetectionStrategy } from '@angular/core';
import { OfferCardComponent } from '../../../../shared/components/offer-card/offer-card.component';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Offer } from '../../../../core/models/offer.model';
import { OfferService } from '../../../../core/services/offer.service';

@Component({
  selector: 'app-offers-list-page',
  standalone: true,
  imports: [CommonModule, OfferCardComponent, RouterModule],
  templateUrl: './offers-list-page.component.html',
  styleUrl: './offers-list-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OffersListPageComponent {
  offers$: Observable<Offer[]> = this.offerService.getOffersSortedByVotes();
  loading$ = this.offerService.loading$;

  constructor(private offerService: OfferService,
     private router: Router) {}

     trackById(index: number, offer: Offer): number {
      return  offer.id;
     }

     OnUpVote(id: number): void {
      console.log('Upvote', id);
      this.offerService.upvote(id);
     }
      OnDownVote(id: number): void {
      console.log('Upvote', id);
        this.offerService.downvote(id);
     }
      OnViewDetails(id: number): void {
      console.log('Upvote', id);
       this.router.navigate(['/offers', id]);
     }
}
