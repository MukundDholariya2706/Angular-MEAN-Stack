import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { Client } from './../../models/client';
import { MatTableDataSource } from '@angular/material/table';
import { ClientService } from './../../services/client.service';
import { Component, OnInit } from '@angular/core';
import { FormDialogComponent } from '../form-dialog/form-dialog.component';
import 'rxjs';
@Component({
  selector: 'app-client-listing',
  templateUrl: './client-listing.component.html',
  styleUrls: ['./client-listing.component.scss'],
})
export class ClientListingComponent implements OnInit {
  displayedColumns = ['firstName', 'lastName', 'email'];
  dataSource = new MatTableDataSource<Client>();

  constructor(
    private clientService: ClientService,
    private dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getClients();
  }

  openDialog() {
    const dialogRef = this.dialog.open(FormDialogComponent, {
      width: '400px',
      height: '350px',
    });
    dialogRef.afterClosed().subscribe(
      (result) => {
        if (!result) {
          return;
        }
        this.clientService.createClient(result).subscribe((data) => {
          this.getClients();
          this._snackBar.open('Created Client!', 'Success', { duration: 2000 });
        });
      },
      (err) => this.errorHandler(err, 'Failed to create Client')
    );
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

  //error handler
  private errorHandler(error: any, message: string) {
    console.error(error);
    this._snackBar.open(message, 'Error', {
      duration: 2000,
    });
  }
}
