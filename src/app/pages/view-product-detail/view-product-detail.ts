import { Component, inject, input } from '@angular/core';
import { EcommerceStore } from '../../ecommerce-store';

@Component({
  selector: 'app-view-product-detail',
  imports: [],
  template: ` <p>view-product-detail works!</p> `,
  styles: ``,
})
export default class ViewProductDetail {
  productId = input.required<string>();
  store = inject(EcommerceStore);

  constructor() {
    this.store.setProductId(this.productId);
  }
}
