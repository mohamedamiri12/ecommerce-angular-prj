import { Component, inject } from '@angular/core';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { MatBadge } from '@angular/material/badge';
import { EcommerceStore } from '../../ecommerce-store';
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu';
import { MatDivider } from '@angular/material/divider';
import { MatDialog } from '@angular/material/dialog';
import { SignInDialog } from '../../components/sign-in-dialog/sign-in-dialog';
import { SignUpDialog } from '../../components/sign-up-dialog/sign-up-dialog';

@Component({
  selector: 'app-header-actions',
  imports: [
    MatButton,
    MatIconButton,
    MatIcon,
    RouterLink,
    MatBadge,
    MatMenu,
    MatMenuItem,
    MatMenuTrigger,
    MatDivider,
  ],
  template: `
    <div class="flex items-center gap-2">
      <button
        matIconButton
        routerLink="/wishlist"
        [matBadge]="store.wishlistCount()"
        [matBadgeHidden]="store.wishlistCount() === 0"
      >
        <mat-icon>favorite</mat-icon>
      </button>
      <button
        matIconButton
        routerLink="/cart"
        [matBadge]="store.cartCount()"
        [matBadgeHidden]="store.cartCount() === 0"
      >
        <mat-icon>shopping_cart</mat-icon>
      </button>
      @if (store.user(); as user) {
        <button matIconButton [matMenuTriggerFor]="userMenu">
          <img [src]="user.imageUrl" [alt]="user.name" class="w-8 h-8 rounded-full" />
        </button>
        <mat-menu #userMenu="matMenu" xPosition="before">
          <div class="flex flex-col px-3 min-w-[200px]">
            <span class="text-sm font-medium">{{ user.name }}</span>
            <span class="text-xs text-gray-500">{{ user.email }}</span>
          </div>
          <mat-divider></mat-divider>
          <button class="!min-h-[32px]" mat-menu-item (click)="store.signOut()">
            <mat-icon>logout</mat-icon>
            Sign Out
          </button>
        </mat-menu>
      } @else {
        <button matButton (click)="openSignInDialog()">Sign In</button>
        <button matButton="filled" (click)="openSignUpDialog()">Sign Up</button>
      }
    </div>
  `,
  styles: ``,
})
export class HeaderActions {
  store = inject(EcommerceStore);
  matDialog = inject(MatDialog);

  openSignInDialog(){
    this.matDialog.open(SignInDialog, {
      disableClose: true,
    })
  }

  openSignUpDialog(){
    this.matDialog.open(SignUpDialog, {
      disableClose: true,
    })
  }
}
