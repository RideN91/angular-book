/**
 * @author    Daniel Kovalovsky (d.kovalovsky@outlook.com)
 * @copyright Copyright (c) 2022 Daniel Kovalovsky
 */

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

import { WindowRef } from '@jeba/sdk/platform';

import type { Observable } from 'rxjs';
import { ReplaySubject } from 'rxjs';
import { first } from 'rxjs/operators';

// import type { IBookResponse } from '../interface/book-response.interface';
import type { IBook } from '../interface/book.interface';

// const API_KEY = 'AIzaSyCxrGbtOrwV-O3v-DErA_6wIpz7xP094y8';

const LOCAL_STORAGE_KEY = 'books'; //  books = klic pro praci s local storage

const DEFAULT_BOOKS: Array<IBook> = [
  {     // constanty pro knihy v knihovne s id, ktere je skryto, update + mazani (mozna)
    author: 'Dan Kov',
    genres: ['Autobiografie'],
    id: '1',
    image: 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/8-pierpont-morgans-library-west-view-1563377066.jpg',
    pages: 589,
    quantity: 0,
    title: 'O zivote programatora'
  },

  {
    author: 'Dante Alighieri',
    genres: ['Alegorie'],
    id: '2',
    pages: 437,
    quantity: 0,
    title: 'Peklo'
  },

  {
    author: 'Robert Green',
    genres: ['Self Help'],
    id: '3',
    pages: 537,
    quantity: 0,
    title: 'Laws of human nature'
  },

  {
    author: 'Seth Godin',
    genres: ['Biografie'],
    id: '4',
    pages: 256,
    quantity: 0,
    title: 'Tribes'
  },

  {
    author: 'Maxwell Maltz',
    genres: ['Self Help'],
    id: '5',
    pages: 304,
    quantity: 0,
    title: 'Psycho-Cybernetics'
  },

  {
    author: 'Stephen M. R. Covey',
    genres: ['Self Help'],
    id: '6',
    pages: 420,
    quantity: 0,
    title: '7 navyku skutecne efektivnich lidi'
  },

  {
    author: 'David Goggins',
    genres: ['Autobiografie', 'Biografie'],
    id: '7',
    pages: 411,
    quantity: 0,
    title: 'Cant hurt me'
  },

  {
    author: 'Julien Smith',
    genres: ['Self Help', 'Real'],
    id: '8',
    pages: 189,
    quantity: 0,
    title: 'The Flinch'
  },
];

@Injectable({
  providedIn: 'root'
})
export class BookService {
  public books$: Observable<Array<IBook>>;

  private _books$ = new ReplaySubject<Array<IBook>>(1);

  public constructor(
    private _domSanitizer: DomSanitizer,
    private _http: HttpClient,
    private _windowRef: WindowRef
  ) {
    this._init();
  }

  public add(book: IBook): void {
    this._books$
      .pipe(first())
      .subscribe(books => {
        book = {
          ...book,
          id: typeof book.id === 'undefined' ? `${Date.now()}` : book.id
        };

        books = [
          ...books,
          book,
        ];

        this._books$.next(books);

        this._save(books);
      });
  }

  // public getAll(): Observable<Array<IBook>> {
  //   return this._http.get<IBookResponse>(`https://www.googleapis.com/books/v1/volumes?q=lord&maxResults=40&key=${API_KEY}`)
  //     .pipe(
  //       map(result => result.items),
  //       map(_books => {
  //         return _books.map(book => ({
  //           author: (book.volumeInfo.authors || []).join('; '),
  //           genres: book.volumeInfo.categories || [],
  //           id: book.id,
  //           image: book.volumeInfo.imageLinks?.smallThumbnail,
  //           pages: book.volumeInfo.pageCount || 0,
  //           preview: book.volumeInfo.previewLink,
  //           title: book.volumeInfo.title
  //         } as IBook))
  //       })
  //     );
  // }

  private _getAll(): void {
    this._books$.next(this._loadBooksFromLS());
  }

  private _init(): void {
    this.books$ = this._books$;

    this._getAll();
  }

  private _loadBooksFromLS(): Array<IBook> {
    let books: Array<IBook> = [...DEFAULT_BOOKS];

    books = books.map(book => {
      if (typeof book.image === 'string') {
        book = {
          ...book,
          image: this._domSanitizer.bypassSecurityTrustUrl(book.image)
        };
      }

      return book;
    });

    if (typeof this._windowRef.nativeWindow.localStorage?.getItem === 'function') {
      const loadedBooksStringified: string | null = this._windowRef.nativeWindow.localStorage.getItem(LOCAL_STORAGE_KEY);

      if (loadedBooksStringified !== null) {
        books = JSON.parse(loadedBooksStringified) as Array<IBook>;
      }
    }

    return books;
  }

  private _save(books: Array<IBook>): boolean {
    try {
      // zakoduju
      const stringified = JSON.stringify(books);

      if (typeof this._windowRef.nativeWindow.localStorage?.setItem === 'function') {
        this._windowRef.nativeWindow.localStorage.setItem(LOCAL_STORAGE_KEY, stringified);  // vkladam pole knih do localStorage pod klicem LSK, zakodovano
      }

      // nactu
      const loaded = JSON.stringify(this._loadBooksFromLS());  // umoznujici dostat se k local storage pomoci LSK

      if (stringified !== loaded) {   // pokud zakodovane nesedi s nactenym = error
        throw new Error('Yikes');
      }

      return true; // pokud sedi vraci true
    } catch (e: unknown) {  // zachyeceni chyby v casi try
      console.error(':-(', e);

      return false;
    }
  }
}
