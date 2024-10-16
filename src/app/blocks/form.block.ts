import { Component, Input } from '@angular/core';

@Component({
  selector: 'form-block',
  standalone: true,
  imports: [],
  template: `
    <p>{{ block.__typename }}</p>
  `,
})
export class FormBlock {
  @Input() block: any;
}
