import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphBarComponent } from './graph-bar.component';

describe('GraphBarComponent', () => {
  let component: GraphBarComponent;
  let fixture: ComponentFixture<GraphBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GraphBarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GraphBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
