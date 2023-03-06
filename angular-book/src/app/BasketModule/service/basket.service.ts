/**
 * @author    Daniel Kovalovsky (d.kovalovsky@outlook.com)
 * @copyright Copyright (c) 2022 Daniel Kovalovsky
 */

import { Injectable } from '@angular/core';

import type { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { first } from 'rxjs/operators';

import type { IBook } from '../../BookModule/interface/book.interface';

import type { IBookForBasket } from '../interface/book-for-basket.interface';

@Injectable({
  providedIn: 'root'
})
export class BasketService {
  public basket$: Observable<Array<IBookForBasket>>;

  private _basket$ = new BehaviorSubject<Array<IBookForBasket>>([]);

  public constructor() {
    this.basket$ = this._basket$;
  }

  public add(book: IBook | IBookForBasket): void { // pridana kniha, je kniha s qnt:1
    this._basket$
      .pipe(first())
      .subscribe(books => {
        // let bookWithQuantity = {
        //   ...book,
        //   quantity: 1
        // };

        book = {
          ...book,
          quantity: book.quantity ?? 0
        };

        const bookFromArrayIndex = books.findIndex(bookFromArray => bookFromArray.id === book.id); // number | undefined
        // vytvoreni constanty indexu pro knihy podle id, title (jedinecnost), vysledek je cislo nebo nedefinovaneho indexu

        const bookFoundInArray: IBookForBasket | undefined = books[bookFromArrayIndex]; // IBook | undefined
        // vytvoreni constanty pro specifickou knihu, tedy kniha vybrana podle title, id ... nebo nedefinvano

        if (typeof bookFoundInArray !== 'undefined') {                     // pokud je kniha nalezena, tedy kniha s indexem ( podle title, id, etc..)
          // bookWithQuantity = {                         // tedy kniha s poctem 1 nalezena
          // ...bookWithQuantity,                       // nalezena kniha s mnozstvim 1
          // quantity: bookFoundInArray.quantity + 1                  // pridavame qnt +1
          // };

          books[bookFromArrayIndex] = {
            ...book,
            quantity: bookFoundInArray.quantity + 1
          }; // bookWithQuantity; // Knihy s [indexy] jsou bookWithQuantity tedy kniha s qnt:1
        } else {                                         // Jinak pokud je v kosiku kniha zmenime u ni qnt
          books = [
            ...books,
            {
              ...book,
              quantity: 1
            },

            // bookWithQuantity
          ];
        }

        this._basket$.next(books); // wtf?
      });
  }

  public decrement(book: IBookForBasket): void { // pridana kniha, je kniha s qnt:1
    this._basket$
      .pipe(first())
      .subscribe(books => {
        const bookFromArrayIndex = books.findIndex(bookFromArray => bookFromArray.id === book.id);

        const bookFoundInArray: IBookForBasket | undefined = books[bookFromArrayIndex];

        if (typeof bookFoundInArray !== 'undefined') {
          books[bookFromArrayIndex] = {
            ...book,
            quantity: bookFoundInArray.quantity - 1
          };

          if (book.quantity <= 1) {
            books = this._remove(books, book);
          }
        }

        this._basket$.next(books);
      });
  }

  public increment(book: IBook | IBookForBasket): void {
    this.add(book);
  }

  public remove(bookToBeRemoved: IBookForBasket): void {
    this._basket$
      .pipe(first())
      .subscribe(books => {
        books = this._remove(books, bookToBeRemoved);

        this._basket$.next(books);
      });
  }

  private _remove(books: Array<IBookForBasket>, bookToBeRemoved: IBookForBasket): Array<IBookForBasket> {
    return books.filter(book => book.id !== bookToBeRemoved.id);
  }
}
