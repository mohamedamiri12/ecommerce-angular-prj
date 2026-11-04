import { Component, inject, input } from '@angular/core';
import { EcommerceStore } from '../../ecommerce-store';
import { BackButton } from '../../components/back-button/back-button';
import { CurrencyPipe } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { ToggleWishlistButton } from '../../components/toggle-wishlist-button/toggle-wishlist-button';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-view-product-detail',
  imports: [BackButton, CurrencyPipe, MatIcon, ToggleWishlistButton, MatButton],
  template: `
    <div class="mx-auto max-w-[1200px] py-6 px-4">
      <app-back-button class="mb-4" navigateTo="/products/all">Back to Products</app-back-button>

      @if (store.selectedProduct(); as product) {
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <img
            [src]="product.imageUrl"
            [alt]="product.name"
            class="w-full rounded-xl object-cover"
          />

          <div class="flex flex-col gap-4">
            <h1 class="text-3xl font-extrabold">{{ product.name }}</h1>
            <p class="text-gray-600">{{ product.rating }} ★ ({{ product.reviewCount }} reviews)</p>
            <p class="text-3xl font-bold">{{ product.price | currency }}</p>
            <p class="text-gray-700 leading-relaxed">{{ product.description }}</p>
            <p class="font-medium">{{ product.inStock ? 'In Stock' : 'Out of Stock' }}</p>

            <div class="flex items-center gap-3">
              <button
                matButton="filled"
                [disabled]="!product.inStock"
                (click)="store.addToCart(product, 1)"
              >
                <mat-icon>shopping_cart</mat-icon>
                Add to Cart
              </button>
              <app-toggle-wishlist-button [product]="product" />
            </div>
          </div>
        </div>
      } @else {
        <p class="text-lg">Product not found.</p>
      }
    </div>
  `,
  styles: ``,
})
export default class ViewProductDetail {
  productId = input.required<string>();
  store = inject(EcommerceStore);

  constructor() {
    this.store.setProductId(this.productId);
  }
}
