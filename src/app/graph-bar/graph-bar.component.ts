import { NgFor } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { GraphColumn } from '../models/graph-column.model';

const COLORS_PALETTE = ["#ff0000", "#ff8000", "#00ff80"];

@Component({
  selector: 'app-graph-bar',
  standalone: true,
  imports: [NgFor],
  templateUrl: './graph-bar.component.html',
  styleUrl: './graph-bar.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GraphBarComponent implements OnChanges {
  @Input() public data: GraphColumn[] = [];
  @Input() public width: number = 0;
  @Input() public height: number = 0;
  public largestValue = 0;
  public colorPalette = COLORS_PALETTE;

  public ngOnChanges(changes: SimpleChanges) {
    if (changes['data']) {
      this.largestValue = Math.max(...this.data.map(column => column.value));
      this.data.forEach((column, i) => {
        column.color = this.colorPalette[i % this.colorPalette.length];
      });
    }
  }
}
