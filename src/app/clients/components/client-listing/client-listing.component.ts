import { Client } from './../../models/client';
import { MatTableDataSource } from '@angular/material/table';
import { ClientService } from './../../services/client.service';
import { Component, OnInit, Inject } from '@angular/core';
@Component({
  selector: 'app-client-listing',
  templateUrl: './client-listing.component.html',
  styleUrls: ['./client-listing.component.scss'],
})
export class ClientListingComponent implements OnInit {
  displayedColumns = ['firstName', 'lastName', 'email'];
  dataSource = new MatTableDataSource<Client>();

  constructor(private clientService: ClientService) {}

  ngOnInit(): void {
    this.getClients();
  }

  openDialog() {
    alert('hi')
  }

  getClients() {
    this.clientService.getClients().subscribe(
      (data) => {
        this.dataSource.data = data;
      },
      (err) => console.error(err)
    );
  }
  
}
