import { InvoiceService } from './services/invoice.service';
import { MaterialModule } from './../Shared/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InvoiceListingComponent } from './components/invoice-listing/invoice-listing.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [InvoiceListingComponent],
  imports: [CommonModule, MaterialModule, FormsModule, HttpClientModule],
  exports: [InvoiceListingComponent],
  providers: [InvoiceService],
})
export class InvoicesModule {}
