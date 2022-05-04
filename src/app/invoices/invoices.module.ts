import { InvoiceService } from './services/invoice.service';
import { MaterialModule } from './../Shared/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InvoiceListingComponent } from './components/invoice-listing/invoice-listing.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { InvoiceFormComponent } from './components/invoice-form/invoice-form.component';

@NgModule({
  declarations: [InvoiceListingComponent, InvoiceFormComponent],
  imports: [CommonModule, MaterialModule, FormsModule, HttpClientModule],
  exports: [InvoiceListingComponent, InvoiceFormComponent],
  providers: [InvoiceService],
})
export class InvoicesModule {}
