import { ClientService } from './services/client.service';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from './../Shared/material.module';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientListingComponent } from './components/client-listing/client-listing.component';

@NgModule({
  declarations: [ClientListingComponent],
  imports: [CommonModule, FormsModule, HttpClientModule, MaterialModule],
  exports: [ClientListingComponent],
  providers: [ClientService],
})
export class ClientsModule {}
