import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Invoice } from './../../models/invoice';
import { InvoiceService } from './../../services/invoice.service';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { merge } from 'rxjs';
import { of as observableOf } from 'rxjs';
import { catchError } from 'rxjs';
import { map } from 'rxjs';
import { startWith } from 'rxjs';
import { switchMap } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
// import { remove } from 'loadsh';
@Component({
  selector: 'app-invoice-listing',
  templateUrl: './invoice-listing.component.html',
  styleUrls: ['./invoice-listing.component.scss'],
})
export class InvoiceListingComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = [
    'item',
    'date',
    'due',
    'qty',
    'rate',
    'tax',
    'action',
  ];
  dataSource = new MatTableDataSource<Invoice>();
  resultsLength = 0;
  resultLoadding = false;

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  constructor(
    private invoiceService: InvoiceService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    // this.paginator.page.subscribe(
    //   (data) => {
    //     this.resultLoadding = true;
    //     this.invoiceService
    //       .getInvoices({
    //         page: data.pageIndex,
    //         perPage: data.pageSize,
    //         sortField: this.sort.active,
    //         sortDir: this.sort.direction,
    //       })
    //       .subscribe((data) => {
    //         this.dataSource = data.docs;
    //         this.resultsLength = data.total;
    //         this.resultLoadding = false;
    //       });
    //   },
    //   (err) => this.errorHandler(err, 'Failed to fetch invoice')
    // );

    // this.sort.sortChange.subscribe(() => {
    //   this.resultLoadding = true;
    //   this.paginator.pageIndex = 0;
    //   this.invoiceService
    //     .getInvoices({
    //       page: this.paginator.pageIndex,
    //       perPage: this.paginator.pageSize,
    //       sortField: this.sort.active,
    //       sortDir: this.sort.direction,
    //     })
    //     .subscribe((data) => {
    //       this.dataSource = data.docs;
    //       this.resultsLength = data.total;
    //       this.resultLoadding = false;
    //     });
    // },
    // (err) => this.errorHandler(err, 'Failed to fetch invoice'));
    // this.populateInvoices();

    merge(this.paginator.page, this.sort.sortChange).pipe(
      startWith({}),
      switchMap(() => {
        this.resultLoadding = true;
        return this.invoiceService.getInvoices({
          page: this.paginator.pageIndex,
          perPage: this.paginator.pageSize,
          sortField: this.sort.active,
          sortDir: this.sort.direction,
        })
      }),
      map(data => {
        this.resultLoadding = false;
        this.resultsLength = data.total;
        return data.docs;
      }),
      catchError(() => {
        this.resultLoadding = false;
        this.errorHandler('Failed to fetch invoices', 'Error');
        return observableOf([]);
      })
    ).subscribe(data => {
      this.dataSource.data = data;
    })
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
    this.resultLoadding = false;
    console.error(error);
    this._snackBar.open(message, 'Error', {
      duration: 2000,
    });
  }

  populateInvoices() {
    this.resultLoadding = true;
    this.invoiceService
      .getInvoices({
        page: this.paginator.pageIndex,
        perPage: this.paginator.pageSize,
        sortField: this.sort.active,
        sortDir: this.sort.direction,
      })
      .subscribe(
        (data) => {
          this.dataSource.data = data.docs;
          this.resultsLength = data.total;
        },
        (err) => {
          this.errorHandler(err, 'Failed to fetch invoices');
        },
        () => {
          this.resultLoadding = false;
        }
      );
  }
}
