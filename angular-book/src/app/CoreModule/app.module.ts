/**
 * @author    Daniel Kovalovsky (d.kovalovsky@outlook.com)
 * @copyright Copyright (c) 2022 Daniel Kovalovsky
 */

import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';

import { BasketModule } from '../BasketModule/basket.module';

import { BookListModule } from '../BookModule/book-list.module';

import { AppComponent } from './container/app.component';

@NgModule({
  bootstrap: [
    AppComponent,
  ],
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,

    BasketModule,
    BookListModule,
    BrowserAnimationsModule,

  ],
  providers: []
})
export class AppModule { }
