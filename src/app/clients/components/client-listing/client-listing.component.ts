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
  displayedColumns = ['firstName', 'lastName', 'email', 'action'];
  dataSource = new MatTableDataSource<Client>();
  resultLoadding = false;

  constructor(
    private clientService: ClientService,
    private dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.resultLoadding = true;
    this.getClients();
  }

  openDialog(clientId: string): void {
    const options = {
      width: '400px',
      height: '350px',
      data: {},
    };
    if (clientId) {
      options.data = { clientId: clientId };
    }
    const dialogRef = this.dialog.open(FormDialogComponent, options);

    dialogRef.afterClosed().subscribe((result) => {
      //when data is empty
      if (!result) {
        return;
      }
      //when client is in edit mode
      if (clientId) {
        this.clientService.updateClient(clientId, result).subscribe(
          () => {
            this.getClients();
            this._snackBar.open('Updated CLient!', 'Success', {
              duration: 2000,
            });
          },
          (err) => {
            this.errorHandler(err, 'Failed to update Client');
          }
        );
      }
      //when client is in create mode
      else {
        this.clientService.createClient(result).subscribe(
          () => {
            this.getClients();
            this._snackBar.open('Created Client!', 'Success', {
              duration: 2000,
            });
          },
          (err) => this.errorHandler(err, 'Failed to create Client')
        );
      }
    });
  }

  deleteBtnHandler(clientId: any) {
    console.log(clientId);
  }

  // get all clients form server side
  getClients() {
    this.clientService.getClients().subscribe(
      (data) => {
        this.dataSource.data = data;
      },
      (err) => console.error(err),
      () => (this.resultLoadding = false)
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
