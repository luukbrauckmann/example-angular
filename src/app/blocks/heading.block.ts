import { Component, Input } from '@angular/core';

@Component({
  selector: 'heading-block',
  standalone: true,
  imports: [],
  template: `
    <h1>{{ block.text }}</h1>
  `,
})
export class HeadingBlock {
  @Input() block: any;
}
