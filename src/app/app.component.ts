import { ChangeDetectionStrategy, Component, computed, inject, OnInit, Signal, signal, WritableSignal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GraphBarComponent } from "./graph-bar/graph-bar.component";
import { HttpClient } from '@angular/common/http';
import { Room } from './models/room.model';
import { Label } from './models/label.model';
import { forkJoin } from 'rxjs';
import { GraphColumn } from './models/graph-column.model';
import { NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    GraphBarComponent,
    NgFor,
    FormsModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  public http: HttpClient = inject(HttpClient);
  public data: WritableSignal<GraphColumn[]> = signal([]);
  public labels: WritableSignal<Label[]> = signal([]);
  public selectedLabels: WritableSignal<number[]> = signal([]);
  public filteredData: Signal<GraphColumn[]> = computed(() => this.filterBySelectedLabels());

  public ngOnInit(): void {
    forkJoin([
      this.http.get<Room[]>('assets/data/rooms.json'),
      this.http.get<Label[]>('assets/data/labels.json')
    ]).subscribe(([rooms, labels]) => {
      this.labels.set(labels);
      const labelsMap: Map<number, Label> = this.createLabelsMap(labels);
      const labelCapacity: Map<number, number> = this.calculateLabelCapacities(rooms, labels, labelsMap);
      const data: GraphColumn[] = this.transformToGraphData(labelCapacity, labelsMap);
      this.data.set(data);
    });
  }

  public filterBySelectedLabels(): GraphColumn[] {
    if (!this.selectedLabels().length) {
      return this.data();
    }
    const filteredData: GraphColumn[] = this.data().filter((col) => this.selectedLabels().includes(col.id));
    return filteredData;
  }

  public clearFilter(): void {
    this.selectedLabels.set([]);
  }

  private createLabelsMap(labels: Label[]): Map<number, Label> {
    return new Map(labels.map(label => [label.id, label]));
  }

  private calculateLabelCapacities(rooms: Room[], labels: Label[], labelsMap: Map<number, Label>): Map<number, number> {
    const labelCapacity: Map<number, number> = new Map(labels.map(label => [label.id, 0]));
    rooms.forEach((room) => {
      room.labels.forEach(labelId => {
        let currentLabel = labelsMap.get(labelId);
        this.incrementCapacity(labelCapacity, labelId, room.capacity);
        if (currentLabel?.parentId) {
          this.incrementCapacity(labelCapacity, currentLabel.parentId, room.capacity);
          currentLabel = labelsMap.get(currentLabel.parentId);
        }
      });
    });
    return labelCapacity;
  }

  private incrementCapacity(labelCapacity: Map<number, number>, labelId: number, capacity: number): void {
    const currentCapacity = labelCapacity.get(labelId);
    labelCapacity.set(labelId, currentCapacity! + capacity);
  }

  private transformToGraphData(labelCapacity: Map<number, number>, labelsMap: Map<number, Label>): GraphColumn[] {
    const graphData: GraphColumn[] = Array.from(labelCapacity.entries()).map(([labelId, capacity]) => {
      return {
        id: labelsMap.get(labelId)!.id,
        label: labelsMap.get(labelId)!.name,
        value: capacity
      };
    });

    return graphData;
  }
}


