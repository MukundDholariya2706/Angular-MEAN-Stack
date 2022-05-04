import { Router } from '@angular/router';
import { Invoice } from './../../models/invoice';
import { InvoiceService } from './../../services/invoice.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-invoice-listing',
  templateUrl: './invoice-listing.component.html',
  styleUrls: ['./invoice-listing.component.scss']
})
export class InvoiceListingComponent implements OnInit {

  displayedColumns: string[] = ['item', 'date', 'due', 'qty', 'rate', 'tax', 'action'];
  dataSource: Invoice[] = [];

  constructor(private invoiceService: InvoiceService, private router: Router) { }

  ngOnInit(): void {
    this.invoiceService.getInvoices().subscribe(res => {
      this.dataSource = res;
    },
    err => {
      console.log(err);
    })
  }

  saveBtnHandler(){
    // this.router.navigate(['dashboard','invoices','new']);
    this.router.navigate(['dashboard/invoices/new']);
  }

}
