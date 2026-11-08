import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Product } from '../models/product';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductsApi {
  private http = inject(HttpClient);
  private apiurl = environment.API_URL;

  getProducts() {
    return this.http.get<Product[]>(this.apiurl + '/api/products');
  }

  getProduct(productId: string) {
    return this.http.get<Product>(`${this.apiurl}/api/products/${productId}`);
  }
}
