/**
 * @author    Daniel Kovalovsky (d.kovalovsky@outlook.com)
 * @copyright Copyright (c) 2022 Daniel Kovalovsky
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { BookDialogComponent } from './presentation/book-dialog.component';

@NgModule({
  declarations: [
    BookDialogComponent,
  ],
  exports: [
    BookDialogComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,

    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
  ]
})
export class BookDialogModule {
}
