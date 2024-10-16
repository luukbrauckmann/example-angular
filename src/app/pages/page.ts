import { Component, OnInit } from '@angular/core';
import { Blocks } from '../blocks/blocks';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'page',
  standalone: true,
  imports: [Blocks],
  template: `
    <blocks [blocks]="blocks" />
  `,
  styles: ``
})
export class Page implements OnInit {
  blocks = [];

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.data.subscribe(({ body }) => {
      this.blocks = body;
    });
  }
}
