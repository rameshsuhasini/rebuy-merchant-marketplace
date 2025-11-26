/// <reference types="jasmine" />
declare const expect: (actual: any) => jasmine.Matchers<any>;
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OffersListPageComponent } from './offers-list-page.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Offer } from '../../../../core/models/offer.model';
import { of } from 'rxjs';

describe('OffersListPageComponent', () => {
  const mockOffers: Offer[] = [
    {
      id: 1,
      title: 'Test 1',
      description: 'Desc 1',
      price: 100,
      votes: 10,
      rating: 4.5,
      merchant: 'M1',
      imageUrl: 'test1.jpg',
      purchaseUrl: 'http://example.com/1',
    },
    {
      id: 2,
      title: 'Test 2',
      description: 'Desc 2',
      price: 200,
      votes: 5,
      rating: 4.0,
      merchant: 'M2',
      imageUrl: 'test2.jpg',
      purchaseUrl: 'http://example.com/2',
    },
  ];

  let component: OffersListPageComponent;
  let fixture: ComponentFixture<OffersListPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OffersListPageComponent, NoopAnimationsModule],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();

    fixture = TestBed.createComponent(OffersListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(OffersListPageComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should handle upvote from child offer card', () => {
    const fixture = TestBed.createComponent(OffersListPageComponent);
    const component = fixture.componentInstance;

    component.loading$ = of(false);
    component.offers$ = of(mockOffers);

    const upvoteSpy = spyOn(component, 'OnUpVote');

    fixture.detectChanges();

    const firstCardDe = fixture.debugElement.query(
      (d) => d.name === 'app-offer-card'
    );

    // simulate child component emitting (upvote)
    firstCardDe.triggerEventHandler('upvote', mockOffers[0].id);

    expect(upvoteSpy).toHaveBeenCalledWith(mockOffers[0].id);
  });

  it('should handle downvote from child offer card', () => {
    const fixture = TestBed.createComponent(OffersListPageComponent);
    const component = fixture.componentInstance;

    component.loading$ = of(false);
    component.offers$ = of(mockOffers);

    const downvoteSpy = spyOn(component, 'OnDownVote');

    fixture.detectChanges();

    const firstCardDe = fixture.debugElement.query(
      (d) => d.name === 'app-offer-card'
    );
    firstCardDe.triggerEventHandler('downvote', mockOffers[0].id);

    expect(downvoteSpy).toHaveBeenCalledWith(mockOffers[0].id);
  });

  it('should handle viewDetails from child offer card', () => {
    const fixture = TestBed.createComponent(OffersListPageComponent);
    const component = fixture.componentInstance;

    component.loading$ = of(false);
    component.offers$ = of(mockOffers);

    const detailsSpy = spyOn(component, 'OnViewDetails');

    fixture.detectChanges();

    const firstCardDe = fixture.debugElement.query(
      (d) => d.name === 'app-offer-card'
    );
    firstCardDe.triggerEventHandler('viewDetails', mockOffers[0].id);

    expect(detailsSpy).toHaveBeenCalledWith(mockOffers[0].id);
  });

  it('should call onSortOrderChange when sort option changes', () => {
    const fixture = TestBed.createComponent(OffersListPageComponent);
    const component = fixture.componentInstance;

    component.loading$ = of(false);
    component.offers$ = of(mockOffers);

    const sortSpy = spyOn(component, 'onSortOrderChange');

    fixture.detectChanges();

    const debugEl = fixture.debugElement;
    const matSelectDe = debugEl.query((d) => d.name === 'mat-select');

    // simulate selectionChange emitted by MatSelect
    matSelectDe.triggerEventHandler('selectionChange', { value: 'votes-asc' });

    expect(sortSpy).toHaveBeenCalledWith('votes-asc');
  });
});
