import { Component, input } from '@angular/core';
import { ViewPanel } from '../../../directives/view-panel';
import { MatIcon } from '@angular/material/icon';
import { MatFormField, MatError } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-shipping-form',
  imports: [ViewPanel, MatIcon, MatFormField, MatInput, ReactiveFormsModule, MatError],
  template: `
    <div appViewPanel>
      <h2 class="text-2xl font-bold mb-6 flex items-center gap-2">
        <mat-icon>local_shipping</mat-icon>
        Shipping Information
      </h2>
      <form [formGroup]="form()" class="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <mat-form-field>
          <input matInput type="text" placeholder="First Name" formControlName="firstName"/>
          <mat-error>First name is required</mat-error>
        </mat-form-field>
        <mat-form-field>
          <input matInput type="text" placeholder="Last Name" formControlName="lastName" />
          <mat-error>Last name is required</mat-error>
        </mat-form-field>
        <mat-form-field class="col-span-2">
          <textarea matInput type="text" placeholder="Address" formControlName="address"></textarea>
          <mat-error>Address is required</mat-error>
        </mat-form-field>
        <mat-form-field>
          <input matInput type="text" placeholder="City" formControlName="city"/>
          <mat-error>City is required</mat-error>
        </mat-form-field>
        <mat-form-field>
          <input matInput type="text" placeholder="State" formControlName="state"/>
          <mat-error>State is required</mat-error>
        </mat-form-field>
        <mat-form-field class="col-span-2">
          <input matInput type="text" placeholder="Zip" formControlName="zip"/>
          <mat-error>Zip code is required</mat-error>
        </mat-form-field>
      </form>
    </div>
  `,
  styles: ``,
})
export class ShippingForm {
  form = input.required<FormGroup>();
}
