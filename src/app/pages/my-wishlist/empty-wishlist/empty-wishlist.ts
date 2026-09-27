import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatAnchor } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-empty-wishlist',
  imports: [MatAnchor, MatIcon, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="flex min-h-[360px] flex-col items-center justify-center px-4 py-12 text-center" aria-labelledby="empty-wishlist-title">
      <div class="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-gray-50">
        <mat-icon aria-hidden="true" class="!h-8 !w-8 !text-[32px]">favorite_border</mat-icon>
      </div>
      <h2 id="empty-wishlist-title" class="mb-2 text-2xl font-bold">Your wishlist is empty</h2>
      <p class="mb-6 max-w-sm text-gray-600">Save the things you love and they'll be waiting for you here.</p>
      <a matButton="filled" routerLink="/products/all">
        <mat-icon aria-hidden="true">storefront</mat-icon>
        Browse products
      </a>
    </section>
  `,
  styles: ``,
})
export class EmptyWishlist {}
