import { NgFor } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, input, InputSignal, Signal } from '@angular/core';
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
export class GraphBarComponent {
  public data: InputSignal<GraphColumn[]> = input.required<GraphColumn[]>();
  public width: InputSignal<number> = input.required<number>();
  public height: InputSignal<number> = input.required<number>();
  public largestValue: Signal<number> = computed(() => Math.max(...this.data().map(column => column.value)));
  public columns: Signal<GraphColumn[]> = computed(() => this.setColumnColor());
  public colorPalette = COLORS_PALETTE;

  private setColumnColor() {
    this.data().forEach((column, i) => {
      column.color = this.colorPalette[i % this.colorPalette.length];
    });
    return [...this.data()];
  }
}
