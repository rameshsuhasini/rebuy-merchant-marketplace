import { Routes } from '@angular/router';
import  {OffersListPageComponent} from './features/offers/pages/offers-list-page/offers-list-page.component';
import  {OfferDetailPageComponent} from './features/offers/pages/offer-detail-page/offer-detail-page.component'

export const routes: Routes = [
    {path : '',  redirectTo: 'offers', pathMatch: 'full'},
    {path : 'offers',  component: OffersListPageComponent},
    {path : 'offers/:id',  component: OfferDetailPageComponent},
    { path: '*', redirectTo: 'offers'},

];
