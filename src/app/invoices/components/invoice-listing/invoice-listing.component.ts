import { InvoiceService } from './../../services/invoice.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-invoice-listing',
  templateUrl: './invoice-listing.component.html',
  styleUrls: ['./invoice-listing.component.scss']
})
export class InvoiceListingComponent implements OnInit {

  constructor(private invoiceService: InvoiceService) { }

  ngOnInit(): void {
    this.invoiceService.getInvoices().subscribe(res => {
      console.log(res);
    },
    err => {
      console.log(err);
    })
  }

}
