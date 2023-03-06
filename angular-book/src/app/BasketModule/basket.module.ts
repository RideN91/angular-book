/**
 * @author    Daniel Kovalovsky (d.kovalovsky@outlook.com)
 * @copyright Copyright (c) 2022 Daniel Kovalovsky
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { BasketComponent } from './container/basket.component';

@NgModule({
  declarations: [
    BasketComponent,
  ],
  exports: [
    BasketComponent,
  ],
  imports: [
    CommonModule,

    MatButtonModule,
    MatIconModule,
  ]
})
export class BasketModule {
}
