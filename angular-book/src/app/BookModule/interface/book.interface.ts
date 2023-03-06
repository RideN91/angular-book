/**
 * @author    Daniel Kovalovsky (d.kovalovsky@outlook.com)
 * @copyright Copyright (c) 2022 Daniel Kovalovsky
 */

import type { SafeUrl } from '@angular/platform-browser';

export interface IBook {
  author: string;
  genres: Array<string>;
  id: string;
  image?: SafeUrl | string;
  pages: number;
  preview?: string;
  quantity?: number;
  title: string;
}
