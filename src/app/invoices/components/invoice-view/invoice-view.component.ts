import { Invoice } from './../../models/invoice';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-invoice-view',
  templateUrl: './invoice-view.component.html',
  styleUrls: ['./invoice-view.component.scss']
})
export class InvoiceViewComponent implements OnInit {

  invoice!: Invoice
  constructor(private router: ActivatedRoute) { }

  ngOnInit(): void {
    this.router.data.subscribe((invoice) => {
      this.invoice = invoice['invoice']
    })
  }

  
}
