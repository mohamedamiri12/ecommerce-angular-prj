import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  template: `
    <h1 class="text-2xl p-6">Hello, {{ title() }}</h1>

    <router-outlet />
  `,
  styles: [],
})
export class App {
  protected readonly title = signal('ecommerce-prj');
}
