import { Component, Input } from '@angular/core';

@Component({
  selector: 'text-block',
  standalone: true,
  imports: [],
  template: `
    <p>{{ block.text }}</p>
  `,
})
export class TextBlock {
  @Input() block: any;
}
