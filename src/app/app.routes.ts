import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'products'
  },
  {
    path: 'products',
    loadComponent: () => import('./pages/products-grid/products-grid'),
  },
  {
    path: 'wishlist',
    loadComponent: () => import('./pages/my-wishlist/my-wishlist'),
  },
];
