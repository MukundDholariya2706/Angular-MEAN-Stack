import { MatDialog } from '@angular/material/dialog';
import { Client } from './../../models/client';
import { MatTableDataSource } from '@angular/material/table';
import { ClientService } from './../../services/client.service';
import { Component, OnInit } from '@angular/core';
import { FormDialogComponent } from '../form-dialog/form-dialog.component';
@Component({
  selector: 'app-client-listing',
  templateUrl: './client-listing.component.html',
  styleUrls: ['./client-listing.component.scss'],
})
export class ClientListingComponent implements OnInit {
  displayedColumns = ['firstName', 'lastName', 'email'];
  dataSource = new MatTableDataSource<Client>();

  constructor(private clientService: ClientService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.getClients();
  }

  saveBtnHandler(){}

  openDialog(): void {
    const dialogRef = this.dialog.open(FormDialogComponent, {
      width: '400px',
      height: '300px'
      
    })
  }

  // get all clients form server side
  getClients() {
    this.clientService.getClients().subscribe(
      (data) => {
        this.dataSource.data = data;
      },
      (err) => console.error(err)
    );
  }

}
