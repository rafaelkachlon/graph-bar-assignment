import { NgFor } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, signal, WritableSignal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Label } from '../models/label.model';

@Component({
  selector: 'app-filter-selection',
  standalone: true,
  imports: [
    NgFor,
    FormsModule
  ],
  templateUrl: './filter-selection.component.html',
  styleUrl: './filter-selection.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilterSelectionComponent {
  @Input() public selectedLabels: WritableSignal<number[]> = signal([]);
  @Input() public labels: WritableSignal<Label[]> = signal([]);

  public clearFilter(): void {
    this.selectedLabels.set([]);
  }
}
