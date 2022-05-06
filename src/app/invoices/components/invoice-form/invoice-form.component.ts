import { Invoice } from './../../models/invoice';
import { ActivatedRoute, Router } from '@angular/router';
import { InvoiceService } from './../../services/invoice.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-invoice-form',
  templateUrl: './invoice-form.component.html',
  styleUrls: ['./invoice-form.component.scss'],
})
export class InvoiceFormComponent implements OnInit {
  invoiceForm!: FormGroup;
  private invoice!: Invoice;
  editMode = false;
  constructor(
    private fb: FormBuilder,
    private invoiceService: InvoiceService,
    private _snackBar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.setInvoiceToForm();
  }

  get f() {
    return this.invoiceForm.controls;
  }

  createForm() {
    this.invoiceForm = this.fb.group({
      item: ['', Validators.required],
      date: ['', Validators.required],
      due: ['', Validators.required],
      qty: ['', Validators.required],
      rate: [''],
      tax: [''],
    });
  }

  onSubmit() {
    //user want to edit the invoice
    if (this.invoice) {
      this.invoiceService
        .updateInvoice(this.invoice._id, this.invoiceForm.value)
        .subscribe(
          (data) => {
            this._snackBar.open('Invoice updated', 'Success', {
              duration: 2000,
            });
            this.router.navigate(['dashboard/invoices']);
            this.invoiceForm.reset();
          },
          (err) => {
            this.errorHandler(err, 'Failed to update invoice');
          }
        );
    } else {
      this.invoiceService.createInvoice(this.invoiceForm.value).subscribe(
        (data) => {
          this._snackBar.open('Invoice creted!', 'Success', {
            duration: 2000,
          });
          this.router.navigate(['dashboard/invoices']);
          this.invoiceForm.reset();
        },
        (err) => {
          this.errorHandler(err, 'Failed to create Invoice');
        }
      );
    }
  }

  onCancel(){
    this.router.navigate(['dashboard/invoices']);
  }

  private setInvoiceToForm() {
    this.route.params.subscribe((params) => {
      // console.log('id :>> ', id);
      let id = params['id'];
      if (!id) {
        return;
      }
      this.invoiceService.getInvoice(id).subscribe(
        (invoice) => {
          this.editMode = true;
          this.invoice = invoice;
          this.invoiceForm.patchValue(this.invoice);
        },
        (err) => this.errorHandler(err, 'Failed to get Invoice')
      );
    });
  }

  private errorHandler(error: any, message: string) {
    console.error(error);
    this._snackBar.open(message, 'Error', {
      duration: 2000,
    });
  }
}
