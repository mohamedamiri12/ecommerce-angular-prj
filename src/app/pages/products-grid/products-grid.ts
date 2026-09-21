import { Component, computed, input, output, signal } from '@angular/core';
import { Product } from '../../models/product';
import { ProductCard } from '../../components/product-card/product-card';
import { MatSidenavContainer, MatSidenavContent, MatSidenav } from '@angular/material/sidenav';
import { MatNavList, MatListItem, MatListItemTitle } from '@angular/material/list';
import { RouterLink } from '@angular/router';
import { TitleCasePipe, UpperCasePipe } from '@angular/common';

@Component({
  selector: 'app-products-grid',
  imports: [
    ProductCard,
    MatSidenavContainer,
    MatSidenavContent,
    MatSidenav,
    MatNavList,
    MatListItem,
    MatListItemTitle,
    RouterLink,
    TitleCasePipe,
  ],
  template: `
    <mat-sidenav-container>
      <mat-sidenav mode="side" opened="true">
        <div class="p-6">
          <h2 class="text-lg text-gray-900">Categories</h2>
          <mat-nav-list>
            @for (cat of categories(); track category) {
              <mat-list-item
                [activated]="cat === category()"
                class="my-2"
                [routerLink]="['/products', cat]"
                ><span
                  matListItemTitle
                  class="font-medium"
                  [class]="cat === category() ? '!text-white' : null"
                  >{{ cat | titlecase }}</span
                ></mat-list-item
              >
            }
          </mat-nav-list>
        </div>
      </mat-sidenav>
      <mat-sidenav-content class="bg-gray-100 p-6 h-full"
        ><h1 class="text-2xl font-bold text-gray-900 mb-1">{{ category() | titlecase }}</h1>
        <p class="text-base text-gray-600 mb-6">{{ filteredProducts().length }} products found</p>
        <div class="responsive-grid">
          @for (product of filteredProducts(); track product.id) {
            <app-product-card [product]="product" />
          }</div
      ></mat-sidenav-content>
    </mat-sidenav-container>
  `,
  styles: ``,
})
export default class ProductsGrid {
  category = input<string>('all');
  products = signal<Product[]>([
    {
      id: '1',
      name: 'Wireless Noise-Cancelling Headphones',
      description:
        'Premium over-ear headphones with active noise cancellation, 30-hour battery life, and crystal-clear sound quality.',
      price: 299.99,
      imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500',
      rating: 4.8,
      reviewCount: 1243,
      inStock: true,
      category: 'Electronics',
    },
    {
      id: '2',
      name: 'Smart Fitness Watch',
      description:
        'Track your health with heart rate monitoring, GPS, sleep tracking, and 7-day battery life.',
      price: 199.99,
      imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500',
      rating: 4.5,
      reviewCount: 876,
      inStock: true,
      category: 'Electronics',
    },
    {
      id: '3',
      name: 'Organic Cotton T-Shirt',
      description:
        'Soft, breathable 100% organic cotton t-shirt. Available in multiple colors and sizes.',
      price: 29.99,
      imageUrl: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500',
      rating: 4.3,
      reviewCount: 542,
      inStock: true,
      category: 'Clothing',
    },
    {
      id: '4',
      name: 'Stainless Steel Water Bottle',
      description:
        'Double-walled insulated bottle keeps drinks cold for 24 hours or hot for 12 hours. 32oz capacity.',
      price: 34.99,
      imageUrl: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500',
      rating: 4.7,
      reviewCount: 2109,
      inStock: true,
      category: 'Home',
    },
    {
      id: '5',
      name: 'Mechanical Gaming Keyboard',
      description:
        'RGB backlit mechanical keyboard with Cherry MX switches, programmable keys, and aluminum frame.',
      price: 149.99,
      imageUrl: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500',
      rating: 4.6,
      reviewCount: 1534,
      inStock: true,
      category: 'Electronics',
    },
    {
      id: '6',
      name: 'Leather Messenger Bag',
      description:
        'Handcrafted full-grain leather bag with laptop compartment and adjustable shoulder strap.',
      price: 179.99,
      imageUrl: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=500',
      rating: 4.4,
      reviewCount: 387,
      inStock: false,
      category: 'Accessories',
    },
    {
      id: '7',
      name: 'Ceramic Coffee Mug Set',
      description:
        'Set of 4 handmade ceramic mugs, microwave and dishwasher safe. Perfect for coffee lovers.',
      price: 44.99,
      imageUrl: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=500',
      rating: 4.9,
      reviewCount: 721,
      inStock: true,
      category: 'Home',
    },
    {
      id: '8',
      name: 'Bluetooth Portable Speaker',
      description:
        'Waterproof portable speaker with 360° sound, 20-hour playtime, and built-in microphone.',
      price: 89.99,
      imageUrl: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500',
      rating: 4.5,
      reviewCount: 1089,
      inStock: true,
      category: 'Electronics',
    },
    {
      id: '9',
      name: 'Yoga Mat with Carrying Strap',
      description:
        'Non-slip eco-friendly yoga mat, 6mm thick, perfect for yoga, pilates, and fitness workouts.',
      price: 39.99,
      imageUrl: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=500',
      rating: 4.6,
      reviewCount: 634,
      inStock: true,
      category: 'Sports',
    },
    {
      id: '10',
      name: 'Scented Soy Candle Trio',
      description:
        'Set of 3 hand-poured soy candles with essential oils: Lavender, Vanilla, and Eucalyptus.',
      price: 54.99,
      imageUrl: 'https://images.unsplash.com/photo-1602607203588-d6d0eda790e3',
      rating: 4.8,
      reviewCount: 412,
      inStock: true,
      category: 'Home',
    },
    {
      id: '11',
      name: 'Wireless Charging Pad',
      description:
        'Fast wireless charger compatible with all Qi-enabled devices. Sleek, slim design with LED indicator.',
      price: 39.99,
      imageUrl:
        'https://plus.unsplash.com/premium_vector-1763442194732-1f01f93a374c?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      rating: 4.2,
      reviewCount: 298,
      inStock: true,
      category: 'Electronics',
    },
    {
      id: '12',
      name: 'Running Shoes',
      description:
        'Lightweight breathable running shoes with responsive cushioning and durable rubber outsole.',
      price: 129.99,
      imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500',
      rating: 4.7,
      reviewCount: 1876,
      inStock: false,
      category: 'Sports',
    },
  ]);
  filteredProducts = computed(() => {
    if (this.category() === 'all') return this.products();
    return this.products().filter(
      (p) => p.category.toLowerCase() === this.category().toLowerCase(),
    );
  });
  categories = signal<string[]>([
    'all',
    'electronics',
    'clothing',
    'accessories',
    'home',
    'sports',
  ]);
}
