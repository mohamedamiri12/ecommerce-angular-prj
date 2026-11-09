import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Order } from '../models/order';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class OrdersApi {
  private http = inject(HttpClient);
  private apiurl = environment.API_URL;

  placeOrder(userId: string, items: { productId: string; quantity: number }[]) {
    return this.http.post<Order>(this.apiurl + '/api/orders', { userId, items });
  }
}
