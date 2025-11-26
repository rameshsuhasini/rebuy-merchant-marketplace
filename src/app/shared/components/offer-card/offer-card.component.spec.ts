/// <reference types="jasmine" />

declare const expect: (actual: any) => jasmine.Matchers<any>;
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfferCardComponent } from './offer-card.component';
import { Offer } from '../../../core/models/offer.model';

describe('OfferCardComponent', () => {
  const mockOffer: Offer = {
    id: 1,
    title: 'Test',
    description: 'd',
    price: 100,
    votes: 10,
    rating: 4.5,
    merchant: 'M',
    imageUrl: 'http://example.com/test.jpg',
    purchaseUrl: 'http://example.com',
  };
  let component: OfferCardComponent;
  let fixture: ComponentFixture<OfferCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OfferCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(OfferCardComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(OfferCardComponent);
    const component = fixture.componentInstance;

    component.offer = mockOffer;
    fixture.detectChanges();

    expect(component).toBeTruthy();
  });

  it('should render offer title', () => {
    const fixture = TestBed.createComponent(OfferCardComponent);
    const component = fixture.componentInstance;

    component.offer = mockOffer;
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain(mockOffer.title);
  });

  it('should render title, merchant, price, rating and votes', () => {
    const fixture = TestBed.createComponent(OfferCardComponent);
    const component = fixture.componentInstance;
    component.offer = mockOffer;

    fixture.detectChanges();

    const el: HTMLElement = fixture.nativeElement;

    expect(el.querySelector('.c-offer-card_title')?.textContent).toContain(
      mockOffer.title
    );

    expect(el.querySelector('.c-offer-card__merchant')?.textContent).toContain(
      mockOffer.merchant
    );

    expect(el.querySelector('.c-offer-card_price')?.textContent).toContain(
      '€100.00'
    ); // from currency: 'EUR'

    expect(el.textContent).toContain(String(mockOffer.rating));
    expect(el.textContent).toContain(String(mockOffer.votes));
  });

  it('should call OnUpVote when upvote button is clicked', () => {
    const fixture = TestBed.createComponent(OfferCardComponent);
    const component = fixture.componentInstance;
    component.offer = mockOffer;
    spyOn(component, 'OnUpVote');

    fixture.detectChanges();

    const el: HTMLElement = fixture.nativeElement;
    const upvoteBtn = el.querySelector(
      'button[aria-label="Upvote Offer"]'
    ) as HTMLButtonElement;

    upvoteBtn.click();

    expect(component.OnUpVote).toHaveBeenCalled();
  });

  it('should call OnDownVote when downvote button is clicked', () => {
    const fixture = TestBed.createComponent(OfferCardComponent);
    const component = fixture.componentInstance;
    component.offer = mockOffer;
    spyOn(component, 'OnDownVote');

    fixture.detectChanges();

    const el: HTMLElement = fixture.nativeElement;
    const downvoteBtn = el.querySelector(
      'button[aria-label="Downvote Offer"]'
    ) as HTMLButtonElement;

    downvoteBtn.click();

    expect(component.OnDownVote).toHaveBeenCalled();
  });

  it('should call OnViewDetails when Details button is clicked', () => {
    const fixture = TestBed.createComponent(OfferCardComponent);
    const component = fixture.componentInstance;
    component.offer = mockOffer;
    spyOn(component, 'OnViewDetails');

    fixture.detectChanges();

    const el: HTMLElement = fixture.nativeElement;
    const detailsBtn = el.querySelector(
      'button[data-testid="offer-details-button"]'
    ) as HTMLButtonElement;

    detailsBtn.click();

    expect(component.OnViewDetails).toHaveBeenCalled();
  });

  it('should show image when imageUrl is provided', () => {
    const fixture = TestBed.createComponent(OfferCardComponent);
    const component = fixture.componentInstance;

    component.offer = { ...mockOffer, imageUrl: 'test.jpg' };
    fixture.detectChanges();

    const el: HTMLElement = fixture.nativeElement;
    const img = el.querySelector('.c-offer-card_image') as HTMLImageElement;

    expect(img).toBeTruthy();
    expect(img.src).toContain('assets/images/test.jpg');
  });

  it('should not render image when imageUrl is empty', () => {
    const fixture = TestBed.createComponent(OfferCardComponent);
    const component = fixture.componentInstance;

    component.offer = { ...mockOffer, imageUrl: '' };
    fixture.detectChanges();

    const el: HTMLElement = fixture.nativeElement;
    const img = el.querySelector('.c-offer-card_image');

    expect(img).toBeNull(); // *ngIf hides it
  });
});
