import { Component, input } from '@angular/core';
import { CartItem } from '../../models/cart';

@Component({
  selector: 'app-show-cart-item',
  imports: [],
  template: ` <div class="grid grid-cols-3 grid-cols-[3fr_1fr_1fr]">
    <div class="flex items-center gap-4">
      <img [src]="item().product.imageUrl" class="w-24 h-24 rounded-lg object-cover"/>
      <div>
        <div class="text-gray-900 text-lg font-semibold">{{item().product.name}}</div>
        <div class="text-gray-600 text-lg">\${{item().product.price}}</div>
      </div>
    </div>
  </div> `,
  styles: ``,
})
export class ShowCartItem {
  item = input.required<CartItem>()
}
