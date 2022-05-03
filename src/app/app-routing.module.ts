import { AppComponent } from './app.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: AppComponent,
  },
  {
    path: 'invoice-builder',
    loadChildren: () =>
      import('./invoice-builder/invoice-builder.module').then(
        (m) => m.InvoiceBuilderModule
      ),
  },
  {
    path: '**',
    redirectTo: 'invoice-builder',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
