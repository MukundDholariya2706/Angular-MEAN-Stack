import { InvoiceFormComponent } from './../invoices/components/invoice-form/invoice-form.component';
import { ClientListingComponent } from './../clients/components/client-listing/client-listing.component';
import { InvoiceListingComponent } from './../invoices/components/invoice-listing/invoice-listing.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: 'invoices',
        component: InvoiceListingComponent
      },
      {
        path: 'invoices/new',
        component: InvoiceFormComponent
      },
      {
        path: 'invoices/:id',
        component: InvoiceFormComponent
      },
      {
        path: 'clients',
        component: ClientListingComponent
      },
      {
        path: '**',
        redirectTo: 'invoices'
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
