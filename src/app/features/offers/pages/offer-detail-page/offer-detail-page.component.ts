import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Observable, switchMap } from 'rxjs';

import { Offer } from '../../../../core/models/offer.model';
import { OfferService } from '../../../../core/services/offer.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatRipple } from "@angular/material/core";

@Component({
  selector: 'app-offer-detail-page',
  standalone: true,
  imports: [CommonModule, RouterModule, MatButtonModule, MatIconModule, MatRipple],
  templateUrl: './offer-detail-page.component.html',
  styleUrl: './offer-detail-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OfferDetailPageComponent {
  offer$: Observable<Offer | undefined> = this.route.paramMap.pipe(
    switchMap((params) => {
      const id = Number(params.get('id'));
      return this.offerService.getOfferById(id);
    })
  );
  constructor(
    private offerService: OfferService,
    private route: ActivatedRoute
  ) {}

  onUpvote(offer: Offer): void {
    this.offerService.upvote(offer.id);
  }

  onDownvote(offer: Offer): void {
    this.offerService.downvote(offer.id);
  }

  onPurchase(offer: Offer): void {
    window.open(offer.purchaseUrl, '_blank');
  }
}
