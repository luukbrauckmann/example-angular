import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormBlock } from './form.block';
import { HeadingBlock } from './heading.block';
import { TextBlock } from './text.block';

const blocksByTypename = {
  FormBlockRecord: FormBlock,
  HeadingBlockRecord: HeadingBlock,
  TextBlockRecord: TextBlock
}

@Component({
  selector: 'blocks',
  standalone: true,
  imports: [CommonModule], // Make sure you import CommonModule and your components
  template: `
    <ng-container *ngFor="let block of blocks">
      <ng-container *ngComponentOutlet="getBlock(block); inputs: { block };" />
    </ng-container>
  `,
  styles: ``
})
export class Blocks {
  @Input() blocks = [];

  getBlock(block: any) {
    if (!blocksByTypename[block.__typename]) {
      console.error(`Block with typename "${block.__typename}" not found`);
    }
    return blocksByTypename[block.__typename]
  }
}
