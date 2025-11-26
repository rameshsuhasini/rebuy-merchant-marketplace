/// <reference types="jasmine" />
declare const expect: (actual: any) => jasmine.Matchers<any>;
import { TestBed } from "@angular/core/testing";
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';

import { OfferApiService } from "./offer-api.service";
import  { Offer} from "../../core/models/offer.model";

describe('OfferApiService', () => {
    let service: OfferApiService;
    let httpMock: HttpTestingController;

    const mockOffers: Offer[] = [
        { id: 1, title: 'Test', description: 'd', price: 100, votes: 10, rating: 4.5, merchant: 'M', imageUrl: '', purchaseUrl: '' }
    ]

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [OfferApiService,  provideHttpClient(), provideHttpClientTesting()],
        });
        service = TestBed.inject(OfferApiService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
    })

     it('should load offers from API', () => {
    service.getOffers().subscribe((offers) => {
      expect(offers.length).toBe(1);
      expect(offers[0].id).toBe(1);
    });

    const req = httpMock.expectOne('http://localhost:3000/offers');
    expect(req.request.method).toBe('GET');
    req.flush(mockOffers);
  });

  it('should update votes successfully', () => {
    const updatedOffer = { ...mockOffers[0], votes: 11 };

    service.updateVotes(1, 1).subscribe((offer) => {
      expect(offer.votes).toBe(11);
    });

    const req = httpMock.expectOne('http://localhost:3000/offers/1/vote');
    expect(req.request.method).toBe('PATCH');
    expect(req.request.body.delta).toBe(1);
    req.flush(updatedOffer);
  });
})