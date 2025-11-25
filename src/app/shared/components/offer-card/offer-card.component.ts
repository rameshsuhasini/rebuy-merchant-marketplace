import { Component, ChangeDetectionStrategy, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Offer } from '../../../core/models/offer.model';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-offer-card',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatCardModule, MatIconModule],
  templateUrl: './offer-card.component.html',
  styleUrl: './offer-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OfferCardComponent {
   @Input() offer!: Offer;
   
   @Output() upvote = new EventEmitter<number>();
   @Output() downvote = new EventEmitter<number>();
   @Output() viewDetails = new EventEmitter<number>();

   OnUpVote(): void {
    this.upvote.emit(this.offer.id);   
  }

   OnDownVote(): void {
    this.downvote.emit(this.offer.id);   
  }

  OnViewDetails(): void{
    this.viewDetails.emit(this.offer.id);
  }
}

