import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Invoice } from './../../models/invoice';
import { InvoiceService } from './../../services/invoice.service';
import { Component, OnInit } from '@angular/core';
// import { remove } from 'loadsh';
@Component({
  selector: 'app-invoice-listing',
  templateUrl: './invoice-listing.component.html',
  styleUrls: ['./invoice-listing.component.scss'],
})
export class InvoiceListingComponent implements OnInit {
  displayedColumns: string[] = [
    'item',
    'date',
    'due',
    'qty',
    'rate',
    'tax',
    'action',
  ];
  dataSource: Invoice[] = [];

  constructor(
    private invoiceService: InvoiceService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
  this.getInvoices();
  }

  saveBtnHandler() {
    // this.router.navigate(['dashboard','invoices','new']);
    this.router.navigate(['dashboard/invoices/new']);
  }

  deleteBtnHandler(id: string) {
    this.invoiceService.deleteInvoice(id).subscribe(
      (data) => {
        this._snackBar.open('Invoice deleted', 'Success', { duration: 2000 });
        this.getInvoices();
      },
      (err) => {
        this.errorHandler(err, 'Failed to delete invoice');
      }
    );
  }

  private errorHandler(error: any, message: string) {
    console.error(error);
    this._snackBar.open(message, 'Error', {
      duration: 2000,
    });
  }

  getInvoices(){
    this.invoiceService.getInvoices().subscribe(
      (data) => {
        this.dataSource = data;
      },
      (err) => {
        this.errorHandler(err, 'Failed to fetch invoices');
      }
    );
  }
  
}
