import { Directive } from '@angular/core';

@Directive({
  selector: '[appViewPanel]',
  host: {
    class: 'border border-gray-200 rounded-xl p-6 bg-white'
  }
})
export class ViewPanel {
  constructor() {}
}
