import { NgModule } from "@angular/core";
import { MatIconModule } from '@angular/material/icon'
import { MatButtonModule } from '@angular/material/button';

const MaterialComponents = [
    MatButtonModule,
    MatIconModule,
];

@NgModule({
    imports: [ MaterialComponents ],
    exports: [ MaterialComponents ],
})

export class MaterialModule {}