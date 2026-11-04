import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProductsApi {
  private http = inject(HttpClient);

  getProducts() {
    return this.http.get('https://dummyjson.com/products?limit=30')
  }
}
