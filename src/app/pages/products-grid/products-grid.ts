import { Component, inject, input, OnInit, signal } from '@angular/core';
import { ProductCard } from '../../components/product-card/product-card';
import { MatSidenavContainer, MatSidenavContent, MatSidenav } from '@angular/material/sidenav';
import { MatNavList, MatListItem, MatListItemTitle } from '@angular/material/list';
import { RouterLink } from '@angular/router';
import { TitleCasePipe, UpperCasePipe } from '@angular/common';
import { EcommerceStore } from '../../ecommerce-store';
import { ToggleWishlistButton } from '../../components/toggle-wishlist-button/toggle-wishlist-button';

@Component({
  selector: 'app-products-grid',
  imports: [
    ProductCard,
    MatSidenavContainer,
    MatSidenavContent,
    MatSidenav,
    MatNavList,
    MatListItem,
    MatListItemTitle,
    RouterLink,
    TitleCasePipe,
    ToggleWishlistButton,
  ],
  template: `
    <mat-sidenav-container class="min-h-[calc(100vh-68px)]">
      <mat-sidenav mode="side" opened="true">
        <div class="p-6">
          <h2 class="text-lg text-gray-900">Categories</h2>
          <mat-nav-list>
            @for (cat of store.categories(); track cat) {
              <mat-list-item
                [activated]="cat === category()"
                class="my-2"
                [routerLink]="['/products', cat]"
                ><span
                  matListItemTitle
                  class="font-medium"
                  [class]="cat === category() ? '!text-white' : null"
                  >{{ cat | titlecase }}</span
                ></mat-list-item
              >
            }
          </mat-nav-list>
        </div>
      </mat-sidenav>
      <mat-sidenav-content class="bg-gray-100 p-6 h-full"
        ><h1 class="text-2xl font-bold text-gray-900 mb-1">{{ category() | titlecase }}</h1>
        <p class="text-base text-gray-600 mb-6">
          {{ store.filteredProducts().length }} products found
        </p>
        <input
          #search
          type="text"
          placeholder="Search products..."
          class="border rounded px-3 py-2 w-full max-w-sm mb-4"
          (input)="store.setSearchTerm(search.value)"
        />
        <select
          #sort
          class="border rounded px-3 py-2 ml-2"
          (change)="store.setSortBy($any(sort.value))"
        >
          <option value="default">Sort by</option>
          <option value="price-asc">Price: low to high</option>
          <option value="price-desc">Price: high to low</option>
          <option value="rating">Top rated</option>
        </select>

        @if (store.productsLoading()) {
          <p class="text-gray-600">Loading products...</p>
        }
        @if (!store.productsLoading() && store.filteredProducts().length === 0) {
          <p class="text-gray-600">No products match your search.</p>
        }
        <div class="responsive-grid">
          @for (product of store.pagedProducts(); track product.id) {
            <app-product-card [product]="product"
              ><app-toggle-wishlist-button
                class="!absolute z-10 top-3  right-3 "
                [product]="product"
            /></app-product-card>
          }
        </div>
        @if (store.totalPages() > 1) {
          <div class="flex items-center justify-center gap-4 mt-8">
            <button
              class="px-4 py-2 border rounded bg-white disabled:opacity-40"
              [disabled]="store.page() === 1"
              (click)="store.setPage(store.page() - 1)"
            >
              Previous
            </button>
            <span>Page {{ store.page() }} of {{ store.totalPages() }}</span>
            <button
              class="px-4 py-2 border rounded bg-white disabled:opacity-40"
              [disabled]="store.page() === store.totalPages()"
              (click)="store.setPage(store.page() + 1)"
            >
              Next
            </button>
          </div>
        }
      </mat-sidenav-content>
    </mat-sidenav-container>
  `,
  styles: ``,
})
export default class ProductsGrid {
  category = input<string>('all');
  store = inject(EcommerceStore);

  constructor() {
    this.store.setCategory(this.category);
    this.store.setSearchTerm('');
    this.store.setSortBy('default');
  }
}
