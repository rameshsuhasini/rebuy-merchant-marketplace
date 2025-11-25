import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule} from '@angular/router';
import { Observable, switchMap } from 'rxjs';

import { Offer } from '../../../../core/models/offer.model';
import { OfferApiService } from '../../../../core/api/offer-api.service';

import  {MatCardModule} from  '@angular/material/card';
import  {MatButtonModule} from  '@angular/material/button';
import  {MatIconModule} from  '@angular/material/icon';


@Component({
  selector: 'app-offer-detail-page',
  standalone: true,
  imports: [CommonModule,RouterModule,MatButtonModule,MatCardModule,MatIconModule],
  templateUrl: './offer-detail-page.component.html',
  styleUrl: './offer-detail-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OfferDetailPageComponent {
  offer$: Observable<Offer> = this.route.paramMap.pipe(
    switchMap((params) => {
      const id = Number(params.get('id'));
      return this.offerApi.getOfferById(id);
    })
  );
  constructor(
    private offerApi: OfferApiService,
    private route: ActivatedRoute
  ) {}

   onPurchase(offer: Offer): void {
    window.open(offer.purchaseUrl, '_blank');
  }
}
