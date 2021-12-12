import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from "@angular/material/card";
import { MatDialogModule } from "@angular/material/dialog";
import { MatIconModule  } from "@angular/material/icon";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatProgressSpinnerModule  } from "@angular/material/progress-spinner";
import { MatBadgeModule } from "@angular/material/badge";
import { MatMenuModule } from '@angular/material/menu';
//const modules :MatCardModule[] = [
//  MatCardModule
//]


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatCardModule,
    MatDialogModule,
    MatIconModule,
    MatSnackBarModule,
    MatProgressSpinnerModule
  ],
  exports: [
    MatCardModule,
    MatDialogModule,
    MatIconModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatBadgeModule,
    MatMenuModule
    
  ]

})
export class MaterialModule { }
