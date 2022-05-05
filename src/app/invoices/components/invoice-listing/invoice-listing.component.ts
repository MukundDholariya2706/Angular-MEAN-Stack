import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Invoice } from './../../models/invoice';
import { InvoiceService } from './../../services/invoice.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
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
  resultsLength = 0;

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  constructor(
    private invoiceService: InvoiceService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.paginator.page.subscribe(
      (data) => {
        this.invoiceService
        .getInvoices({ page: ++data.pageIndex, perPage: data.pageSize })
        .subscribe((data) => {
          console.log(data);
          this.dataSource = data.docs;
          this.resultsLength = data.total;
        });
      },
      (err) => this.errorHandler(err, 'Failed to fetch invoice')
      );
      this.populateInvoices();
  }

  saveBtnHandler() {
    // this.router.navigate(['dashboard','invoices','new']);
    this.router.navigate(['dashboard/invoices/new']);
  }

  deleteBtnHandler(id: string) {
    this.invoiceService.deleteInvoice(id).subscribe(
      (data) => {
        this._snackBar.open('Invoice deleted', 'Success', { duration: 2000 });
        this.populateInvoices();
      },
      (err) => {
        this.errorHandler(err, 'Failed to delete invoice');
      }
    );
  }

  editBtnHandler(id: string) {
    this.router.navigate([`dashboard/invoices/${id}`]);
  }

  private errorHandler(error: any, message: string) {
    console.error(error);
    this._snackBar.open(message, 'Error', {
      duration: 2000,
    });
  }

  populateInvoices() {
    this.invoiceService.getInvoices({ page: 1, perPage: 4 }).subscribe(
      (data) => {
        this.dataSource = data.docs;
        this.resultsLength = data.total;
      },
      (err) => {
        this.errorHandler(err, 'Failed to fetch invoices');
      }
    );
  }
}
