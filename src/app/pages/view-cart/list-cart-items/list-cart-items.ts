import { Component, inject } from '@angular/core';
import { ViewPanel } from '../../../directives/view-panel';
import { EcommerceStore } from '../../../ecommerce-store';
import { ShowCartItem } from '../../show-cart-item/show-cart-item';

@Component({
  selector: 'app-list-cart-items',
  imports: [ViewPanel, ShowCartItem],
  template: `<div appViewPanel>
    <h2 class="text-2xl font-bold mb-4">Cart Items ({{store.cartCount()}})</h2>
    <div class="flex flex-col gap-6">
      @for (item of store.cartItems(); track item.product.id) {
        <app-show-cart-item [item]='item' />
      }
    </div>
  </div> `,
  styles: ``,
})
export class ListCartItems {
  store = inject(EcommerceStore);
}
