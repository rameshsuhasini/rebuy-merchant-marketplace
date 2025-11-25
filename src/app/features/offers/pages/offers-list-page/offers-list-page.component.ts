import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Offer } from '../../../../core/models/offer.model';
import { OfferService } from '../../../../core/services/offer.service';
import { OfferCardComponent } from '../../../../shared/components/offer-card/offer-card.component';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';


type SortOrder = 'votes-desc' | 'votes-asc';

@Component({
  selector: 'app-offers-list-page',
  standalone: true,
  imports: [CommonModule, OfferCardComponent, RouterModule, MatFormFieldModule,MatSelectModule],
  templateUrl: './offers-list-page.component.html',
  styleUrl: './offers-list-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OffersListPageComponent {
 loading$ = this.offerService.loading$;

  private sortOrder$ = new BehaviorSubject<SortOrder>('votes-desc');

  
  offers$: Observable<Offer[]> = combineLatest([
    this.offerService.offers$,
    this.sortOrder$,
  ]).pipe(
    map(([offers, order]) => {
      const list = [...offers];
      list.sort((a, b) =>
        order === 'votes-desc' ? b.votes - a.votes : a.votes - b.votes
      );
      return list;
    })
  );

  constructor(private offerService: OfferService,
     private router: Router) {}

     trackById(index: number, offer: Offer): number {
      return  offer.id;
     }

     OnUpVote(id: number): void {
      this.offerService.upvote(id);
     }
      OnDownVote(id: number): void {
        this.offerService.downvote(id);
     }
      OnViewDetails(id: number): void {
       this.router.navigate(['/offers', id]);
     }

     onSortOrderChange(order: SortOrder): void {
      this.sortOrder$.next(order);
     }
}
