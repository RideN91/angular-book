/**
 * @author    Daniel Kovalovsky (d.kovalovsky@outlook.com)
 * @copyright Copyright (c) 2022 Daniel Kovalovsky
 */

import { Component } from '@angular/core';

import type { Observable } from 'rxjs';

import type { IBookForBasket } from '../interface/book-for-basket.interface';
import { BasketService } from '../service/basket.service';

@Component({
  selector: 'book-basket',
  styleUrls: ['./basket.component.scss'],
  templateUrl: './basket.component.html'
})
export class BasketComponent {
  public books$: Observable<Array<IBookForBasket>>;

  public constructor(private _basketService: BasketService) {
    this.books$ = this._basketService.basket$;
  }

  public decrement(book: IBookForBasket): void {
    this._basketService.decrement(book);
  }

  public increment(book: IBookForBasket): void {
    this._basketService.increment(book);
  }

  public remove(book: IBookForBasket): void {
    this._basketService.remove(book);
  }
}
