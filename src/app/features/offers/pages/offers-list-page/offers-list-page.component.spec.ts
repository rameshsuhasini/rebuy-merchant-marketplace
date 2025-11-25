import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OffersListPageComponent } from './offers-list-page.component';

describe('OffersListPageComponent', () => {
  let component: OffersListPageComponent;
  let fixture: ComponentFixture<OffersListPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OffersListPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OffersListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
