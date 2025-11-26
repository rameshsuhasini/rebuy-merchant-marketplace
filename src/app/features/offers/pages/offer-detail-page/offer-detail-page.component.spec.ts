/// <reference types="jasmine" />
declare const expect: (actual: any) => jasmine.Matchers<any>;

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfferDetailPageComponent } from './offer-detail-page.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { Offer } from '../../../../core/models/offer.model';


describe('OfferDetailPageComponent', () => {
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
  let component: OfferDetailPageComponent;
  let fixture: ComponentFixture<OfferDetailPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OfferDetailPageComponent, RouterTestingModule],
        providers: [
        provideHttpClient(),    
        provideHttpClientTesting()  ,
         {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: convertToParamMap({ id: '1' })
            },
            paramMap: of(convertToParamMap({ id: '1' }))
          }
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OfferDetailPageComponent);
    component = fixture.componentInstance;

  });

   it('should create', () => {
    const fixture = TestBed.createComponent(OfferDetailPageComponent);
    const component = fixture.componentInstance;
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should render offer details when offer$ emits', () => {
  const fixture = TestBed.createComponent(OfferDetailPageComponent);
  const component = fixture.componentInstance;

  component.offer$ = of(mockOffer);   // mock observable
  fixture.detectChanges();

  const compiled = fixture.nativeElement as HTMLElement;

  expect(compiled.querySelector('.detail-layout__title')?.textContent)
    .toContain(mockOffer.title);

  expect(compiled.querySelector('.detail-layout__merchant')?.textContent)
    .toContain(mockOffer.merchant);

  expect(compiled.querySelector('.detail-layout__price')?.textContent)
    .toContain('€100.00');

  expect(compiled.querySelector('[data-testid="detail-votes"]')?.textContent)
    .toContain(String(mockOffer.votes));
});

it('should call onUpvote when clicking upvote button', () => {
  const fixture = TestBed.createComponent(OfferDetailPageComponent);
  const component = fixture.componentInstance;

  component.offer$ = of(mockOffer);
  spyOn(component, 'onUpvote');

  fixture.detectChanges();

  const btn = fixture.nativeElement.querySelector('[data-testid="detail-upvote"]') as HTMLElement;
  btn.click();

  expect(component.onUpvote).toHaveBeenCalledWith(mockOffer);
});

it('should contain back navigation link', () => {
  const fixture = TestBed.createComponent(OfferDetailPageComponent);
  fixture.detectChanges();

  const link = fixture.nativeElement.querySelector('.back-link') as HTMLAnchorElement;

  expect(link.getAttribute('ng-reflect-router-link')).toContain('/offers');
});

});
