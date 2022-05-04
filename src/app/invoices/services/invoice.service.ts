import { Invoice } from './../models/invoice';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const BASE_URL = "http://localhost:3000/api"

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  constructor(private http: HttpClient) { }


  getInvoices(): Observable<Invoice[]>{
    return this.http.get<Invoice[]>(`${BASE_URL}/invoices`);
  };

}
