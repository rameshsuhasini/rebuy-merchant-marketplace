import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { OfferApiService } from './core/api/offer-api.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'rebuy-merchant-marketplace';

  constructor(private offerApi: OfferApiService){  
  }

  ngOnInit(): void{
    this.offerApi.getOffers().subscribe((offers) => {
      console.log('Offers from API:', offers);
    });
  }
}
