import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root',
})
export class ProductsApi {
  private http = inject(HttpClient);

  getProducts() {
    return this.http.get<Product[]>('http://localhost:8080/api/products');
  }

  getProduct(productId: string) {
    return this.http.get<Product>(`http://localhost:8080/api/products/${productId}`);
  }
}
