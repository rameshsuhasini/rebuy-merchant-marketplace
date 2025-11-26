
/// <reference types="jasmine" />

declare const expect: (actual: any) => jasmine.Matchers<any>;
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { OfferService } from './offer.service';
import { OfferApiService } from '../api/offer-api.service';
import { Offer } from '../models/offer.model';

describe('OfferService', () => {
  let service: OfferService;
  let apiSpy: jasmine.SpyObj<OfferApiService>;

  const mockOffers: Offer[] = [
    {
      id: 1,
      title: 'Phone',
      description: 'xx',
      price: 200,
      votes: 5,
      rating: 4.1,
      merchant: 'M',
      imageUrl: 'sonyHeadphone.jpeg',
      purchaseUrl: '"https://www.rebuy.de/product/3'
    },
    {
      id: 2,
      title: 'Laptop',
      description: 'xx',
      price: 800,
      votes: 12,
      rating: 4.5,
      merchant: 'M',
      imageUrl: '',
      purchaseUrl: ''
    }
  ];

  beforeEach(() => {
    apiSpy = jasmine.createSpyObj<OfferApiService>('OfferApiService', ['getOffers', 'updateVotes']);

    apiSpy.getOffers.and.returnValue(of(mockOffers));
    apiSpy.updateVotes.and.callFake((id: number, delta: number) => {
      const base = mockOffers.find((o) => o.id === id)!;
      return of({ ...base, votes: base.votes + delta });
    });

    TestBed.configureTestingModule({
      providers: [
        OfferService,
        { provide: OfferApiService, useValue: apiSpy }
      ],
    });

    service = TestBed.inject(OfferService);
  });

  it('should load offers into BehaviorSubject', (done) => {
    service.offers$.subscribe((offers) => {
      expect(offers.length).toBe(2);
      expect(offers[0].id).toBe(1);
      done();
    });
  });

  it('should update votes for one offer only', (done) => {
    service.upvote(1);

    service.offers$.subscribe((offers) => {
      const phone = offers.find((o) => o.id === 1)!;
      const laptop = offers.find((o) => o.id === 2)!;

      expect(phone.votes).toBe(6); 
      expect(laptop.votes).toBe(12);
      done();
    });
  });
});
