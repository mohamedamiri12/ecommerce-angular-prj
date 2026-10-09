import { Component } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-order-success',
  imports: [MatButton, MatIcon, RouterLink],
  template: `
    <div class="flex min-h-screen items-center justify-center bg-[#1a1d2b] px-4 py-6">
      <div class="flex w-full max-w-[560px] flex-col items-center justify-center gap-6 rounded-xl bg-[#f8fafc] p-8 text-center shadow-[0_20px_45px_rgba(15,23,42,0.22)]">
        <mat-icon class="!h-[56px] !w-[56px] !text-[56px] !text-green-500">check_circle</mat-icon>

        <h2 class="text-2xl font-bold text-green-600">Order Successful!</h2>

        <p class="text-base text-slate-700">
          Thank you for your purchase! Your order has been confirmed and will be shipped soon.
        </p>

        <p class="text-gray-600">
          You will receive an email confirmation shortly with your order details and tracking information.
        </p>

        <button matButton="filled" color="primary" class="mt-2 w-full max-w-xs" routerLink="/products/all">
          Continue Shopping
        </button>
      </div>
    </div>
  `,
  styles: ``,
})
export default class OrderSuccess {}
