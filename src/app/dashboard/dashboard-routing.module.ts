import { InvoiceListingComponent } from './../invoices/components/invoice-listing/invoice-listing.component';
import { MainContentComponent } from './components/main-content/main-content.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: '',
        component: MainContentComponent,
      },
      {
        path: 'invoices',
        component: InvoiceListingComponent
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
