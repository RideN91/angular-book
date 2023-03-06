/**
 * @author    Daniel Kovalovsky (d.kovalovsky@outlook.com)
 * @copyright Copyright (c) 2022 Daniel Kovalovsky
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { BookListComponent } from './container/book-list.component';

import { BookDialogModule } from './book-dialog.module';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    BookListComponent,
  ],
  exports: [
    BookListComponent,
  ],
  imports: [
    CommonModule,
    BookDialogModule,

    MatButtonModule,
  ]
})
export class BookListModule {
}
