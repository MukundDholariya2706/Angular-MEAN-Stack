import { InvoiceService } from './../../services/invoice.service';
import { Invoice } from './../../models/invoice';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-invoice-view',
  templateUrl: './invoice-view.component.html',
  styleUrls: ['./invoice-view.component.scss']
})
export class InvoiceViewComponent implements OnInit {

  invoice!: Invoice;
  total!: number;
  isResultsLoading = false;

  constructor(private router: ActivatedRoute, private invoiceService: InvoiceService) { }

  ngOnInit(): void {
    this.router.data.subscribe((invoice) => {
      this.invoice = invoice['invoice']
      if(typeof this.invoice.qty !== 'undefined' && typeof this.invoice.rate !== 'undefined'){
        this.total = this.invoice.qty * this.invoice.rate;
      }
      let salesTax = 0;
      if(typeof this.invoice.tax !== 'undefined'){
        salesTax = this.total * this.invoice.tax / 100;
      }
      this.total += salesTax;
    })
  }

  downloadHandler(invoiceId: string){
    this.isResultsLoading = true;
    this.invoiceService.downloadInvoice(invoiceId).subscribe(data => {
      console.log(data);
      saveAs(data, this.invoice.item);
    }, err => {
      console.error(err);
    },
    ()=>{ this.isResultsLoading = false});
  }

  
}
