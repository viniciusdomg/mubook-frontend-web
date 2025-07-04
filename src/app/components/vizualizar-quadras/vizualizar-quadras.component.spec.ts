import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VizualizarQuadrasComponent } from './vizualizar-quadras.component';

describe('VizualizarQuadrasComponent', () => {
  let component: VizualizarQuadrasComponent;
  let fixture: ComponentFixture<VizualizarQuadrasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VizualizarQuadrasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VizualizarQuadrasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
