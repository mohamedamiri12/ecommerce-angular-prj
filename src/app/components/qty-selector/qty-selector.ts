import { Component, input, output } from '@angular/core';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-qty-selector',
  imports: [MatIconButton, MatIcon],
  template: `
    <div class="flex items-center gap-3">
      <div class="inline-flex items-center">
        <button
          matIconButton
          [disabled]="quantity() === 1"
          (click)="qtyUpdated.emit(quantity() - 1)"
        >
          <mat-icon>remove</mat-icon>
        </button>
        <div class="px-3">{{quantity()}}</div>
        <button matIconButton (click)="qtyUpdated.emit(quantity() + 1)">
          <mat-icon>add</mat-icon>
        </button>
      </div>
    </div>
  `,
  styles: ``,
})
export class QtySelector {
  quantity = input(0);
  qtyUpdated = output<number>();
}
