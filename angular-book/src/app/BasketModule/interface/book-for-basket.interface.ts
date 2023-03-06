/**
 * @author    Daniel Kovalovsky (d.kovalovsky@outlook.com)
 * @copyright Copyright (c) 2022 Daniel Kovalovsky
 */

import type { IBook } from '../../BookModule/interface/book.interface';

export interface IBookForBasket extends IBook {
  quantity: number;
}
