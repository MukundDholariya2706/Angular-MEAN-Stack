import { ClientService } from './../../services/client.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Client } from '../../models/client';

@Component({
  selector: 'app-form-dialog',
  templateUrl: './form-dialog.component.html',
  styleUrls: ['./form-dialog.component.scss'],
})
export class FormDialogComponent implements OnInit {
  clientForm!: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<FormDialogComponent>,
    private fb: FormBuilder,
    private clientService: ClientService,
    @Inject(MAT_DIALOG_DATA) public data: Client
  ) {}

  get f() {
    return this.clientForm.controls;
  }

  ngOnInit(): void {
    this.initClientForm();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  // client form and validation
  private initClientForm() {
    this.clientForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });
  }
}
