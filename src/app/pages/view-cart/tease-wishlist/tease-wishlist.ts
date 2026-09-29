import { Component, inject } from '@angular/core';
import { ViewPanel } from '../../../directives/view-panel';
import { MatIcon } from '@angular/material/icon';
import { EcommerceStore } from '../../../ecommerce-store';
import { MatAnchor } from '@angular/material/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-tease-wishlist',
  imports: [ViewPanel, MatIcon, MatAnchor, RouterLink],
  template: `
    <div appViewPanel class="flex items-center justify-between">
      <div class="flex items-center gap-3">
        <mat-icon class="!text-red-500">favorite_border</mat-icon>
        <div>
          <h2 class="text-xl font-bold">Wishlist ({{store.wishlistCount()}})</h2>
          <p class="text-gray-500 text-sm">You have {{store.wishlistCount()}} items saved for later</p>
        </div>
      </div>
      <div class="flex items-center gap-3">
        <button matButton routerLink="/wishlist">View All</button>
        <button matButton="filled" class="flex items-center gap-2" (click)="store.addAllWishlistToCart()">
          <mat-icon>shopping_cart</mat-icon>
          Add All to Cart
        </button>
      </div>
    </div>
  `,
  styles: ``,
})
export class TeaseWishlist {
  store = inject(EcommerceStore);
}
