import { Component, inject } from '@angular/core';
import { BackButton } from '../../components/back-button/back-button';
import { EcommerceStore } from '../../ecommerce-store';
import { ProductCard } from '../../components/product-card/product-card';
import { ToggleWishlistButton } from '../../components/toggle-wishlist-button/toggle-wishlist-button';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton, MatAnchor } from '@angular/material/button';
import { EmptyWishlist } from './empty-wishlist/empty-wishlist';

@Component({
  selector: 'app-my-wishlist',
  imports: [BackButton, ProductCard, MatIcon, MatIconButton, MatAnchor, EmptyWishlist],
  template: `
    <div class="mx-auto max-w-[1200px] py-6 px-4">
      <app-back-button class="mb-6" navigateTo="/products/all">Continue Shopping</app-back-button>
      @if (store.wishlistCount() > 0) {
        <div class="flex justify-between items-center mb-6">
          <h1 class="text-2xl font-bold">My Wishlist</h1>
          <span class="text-gray-500 text-xl">{{ store.wishlistCount() }} items</span>
        </div>

        <div class="responsive-grid">
          @for (product of store.wishlistItems(); track product.id) {
            <app-product-card [product]="product"
              ><button
                class="!absolute z-10 top-3  right-3 w-10 h-10 rounded-full !bg-white border-0 shadow-md flex items-center justify-center cursor-pointer transition-all duration-200 hover:scale-110 hover:shadow-lg"
                matIconButton
                (click)="store.removeFromWishlist(product)"
              >
                <mat-icon>delete</mat-icon>
              </button></app-product-card
            >
          }
        </div>

        <div class="mt-8 flex justify-center">
          <button matButton="outlined" class="danger" (click)="store.clearWishlist()">Clear Wishlist</button>
        </div>
      } @else {
        <app-empty-wishlist />
      }
    </div>
  `,
  styles: ``,
})
export default class MyWishlist {
  store = inject(EcommerceStore);
}
