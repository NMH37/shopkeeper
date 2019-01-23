import { NgModule } from '@angular/core';
import {
  MatInputModule, MatCardModule, MatTableModule,
  MatButtonModule, MatToolbarModule,
  MatExpansionModule, MatDialogModule
} from '@angular/material';

@NgModule({
  exports: [MatInputModule,
    MatCardModule,
    MatTableModule,
    MatButtonModule,
    MatToolbarModule,
    MatExpansionModule,
    MatDialogModule]
})
export class AngularMaterialModule { }
