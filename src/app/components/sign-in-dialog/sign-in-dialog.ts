import { Component, inject, signal } from '@angular/core';
import { MatIconButton, MatAnchor } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MAT_DIALOG_DATA, MatDialogClose, MatDialogRef } from '@angular/material/dialog';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormField, MatPrefix, MatSuffix } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { EcommerceStore } from '../../ecommerce-store';
import { SignInParams } from '../../models/user';

@Component({
  selector: 'app-sign-in-dialog',
  imports: [MatIconButton, MatIcon, MatDialogClose, MatFormField, MatSuffix,MatPrefix, MatAnchor, MatInput, ReactiveFormsModule],
  template: `
    <div class="p-8 max-w-[400px] flex flex-col">
      <div class="flex justify-between">
        <div>
          <h2 class="text-xl font-medium mb-1">Sign In</h2>
          <p class="text-sm text-gray-500">Sign in to your account to continue shopping</p>
        </div>
        <button tabindex="-1" matIconButton class="-mt-2 -mr-2" mat-dialog-close>
          <mat-icon>close</mat-icon>
        </button>
      </div>
      <form class="mt-6" [formGroup]="signInform" (ngSubmit)="signIn()">
        <mat-form-field class="mb-4">
          <input matInput formControlName="email" type="email" placeholder="Enter your mail" />
          <mat-icon matPrefix>email</mat-icon>
        </mat-form-field>
        <mat-form-field class="mb-6">
          <input
            matInput
            formControlName="password"
            type="password"
            [type]="passwordVisible() ? 'text' : 'password'"
            placeholder="Enter your password"
          />
          <mat-icon matPrefix>lock</mat-icon>
          <button matSuffix matIconButton type="button" class="mr-2" (click)="passwordVisible.set(!passwordVisible())">
          <mat-icon [fontIcon]="passwordVisible() ? 'visibility_off' : 'visibility'"></mat-icon>

          </button>
        </mat-form-field>
        <button type="submit" matButton="filled" class="w-full">Sign In</button>
      </form>
    </div>
  `,
  styles: ``,
})
export class SignInDialog {
  fb = inject(NonNullableFormBuilder);
  data = inject<{checkout: boolean}>(MAT_DIALOG_DATA);
  dialogRef = inject(MatDialogRef);

  signInform = this.fb.group({
    email: ['amiri@test.com', Validators.required],
    password: ['test123', Validators.required],
  });

  passwordVisible = signal(false);
  store = inject(EcommerceStore);

  signIn() {
    if(!this.signInform.valid) {
      this.signInform.markAllAsTouched();
      return;
    }

    const {email, password} = this.signInform.value;

    this.store.signIn({email, password, checkout: this.data.checkout, dialogId: this.dialogRef.id} as SignInParams);
  }
}
