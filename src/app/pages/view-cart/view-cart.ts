import { Component } from '@angular/core';
import { BackButton } from '../../components/back-button/back-button';
import { ListCartItems } from './list-cart-items/list-cart-items';
import { TeaseWishlist } from './tease-wishlist/tease-wishlist';

@Component({
  selector: 'app-view-cart',
  imports: [BackButton, ListCartItems, TeaseWishlist],
  template: ` <div class="mx-auto max-w-[1200px] py-6">
    <app-back-button class="mb-6" navigateTo="/products/all">Continue Shopping</app-back-button>
    <h1 class="text-3xl font-extrabold mb-4">Shopping Cart</h1>

    <app-tease-wishlist class="mb-6 block" />

    <div class="grid gird-cols-1 lg:grid-cols-3 gap-6">
      <div class="lg:col-span-2">
        <app-list-cart-items />
      </div>
    </div>
  </div>`,
  styles: ``,
})
export default class ViewCart {}
