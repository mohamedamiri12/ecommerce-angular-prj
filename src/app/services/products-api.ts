import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map } from 'rxjs';
import { Product } from '../models/product';

type ApiProduct = {
  id: number;
  title: string;
  description: string;
  price: number;
  thumbnail: string;
  rating: number;
  stock: number;
  category: string;
  reviews: unknown[];
};

type ApiResponse = { products: ApiProduct[] };

@Injectable({
  providedIn: 'root',
})
export class ProductsApi {
  private http = inject(HttpClient);

  getProducts() {
    return this.http.get<ApiResponse>('https://dummyjson.com/products?limit=0').pipe(
      map((response): Product[] =>
        response.products.map((p) => ({
          id: String(p.id),
          name: p.title,
          description: p.description,
          price: p.price,
          imageUrl: p.thumbnail,
          rating: p.rating,
          reviewCount: p.reviews.length,
          inStock: p.stock > 0,
          category: p.category,
        })),
      ),
    );
  }
}
