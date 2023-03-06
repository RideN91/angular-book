/**
 * @author    Daniel Kovalovsky (d.kovalovsky@outlook.com)
 * @copyright Copyright (c) 2022 Daniel Kovalovsky
 */

import type { OnDestroy } from '@angular/core';
import { Component } from '@angular/core';

import type { MatDialogRef } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';

import type { Observable, Subscription } from 'rxjs';

import { BasketService } from '../../BasketModule/service/basket.service';

import type { IBook } from '../interface/book.interface';
import { BookDialogComponent } from '../presentation/book-dialog.component';
import { BookService } from '../service/book.service';

@Component({
  selector: 'book-list',
  styleUrls: ['./book-list.component.scss'],
  templateUrl: './book-list.component.html'
})
export class BookListComponent implements OnDestroy {
  public books$: Observable<Array<IBook>>;

  private _dialogRef: MatDialogRef<BookDialogComponent, IBook>;

  private _dialogRefSubscription: Subscription | undefined;

  public constructor(
    private _basketService: BasketService,
    private _bookService: BookService,
    private _matDialog: MatDialog
  ) {
    this.books$ = this._bookService.books$;
  }

  public add(book: IBook): void {
    this._basketService.add(book);
  }

  public ngOnDestroy(): void {
    this._dialogRefSubscription?.unsubscribe();
  }

  public openDialog(): void {
    this._dialogRef = this._matDialog.open(BookDialogComponent);

    this._dialogRefSubscription = this._dialogRef.afterClosed()
      // .subscribe(console.log)
      .subscribe(book => {
        if (typeof book !== 'undefined') {
          this._bookService.add(book);
        }
      });
  }
}
