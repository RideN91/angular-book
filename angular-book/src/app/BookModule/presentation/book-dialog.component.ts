/**
 * @author    Daniel Kovalovsky (d.kovalovsky@outlook.com)
 * @copyright Copyright (c) 2022 Daniel Kovalovsky
 */

import { Component } from '@angular/core';
import type { UntypedFormGroup } from '@angular/forms';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'book-dialog',
  styleUrls: [
    './book-dialog.component.css',
  ],
  templateUrl: './book-dialog.component.html'
})
export class BookDialogComponent {
  public form: UntypedFormGroup;

  public constructor(
    private _formBuilder: UntypedFormBuilder,
    private _matDialogRef: MatDialogRef<BookDialogComponent>
  ) {
    this._init();
  }

  public save(): void {
    if (this.form.valid) {
      this._matDialogRef.close(this.form.value);
    }
  }

  private _init(): void {
    this.form = this._formBuilder.group({
      author: ['', Validators.required],
      genres: ['', Validators.required],
      pages: [0, [Validators.required, Validators.min(1)] ],
      title: ['', Validators.required]
    });
  }
}
