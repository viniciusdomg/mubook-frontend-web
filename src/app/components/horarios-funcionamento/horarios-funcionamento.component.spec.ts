import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HorariosFuncionamentoComponent } from './horarios-funcionamento.component';

describe('HorariosFuncionamentoComponent', () => {
  let component: HorariosFuncionamentoComponent;
  let fixture: ComponentFixture<HorariosFuncionamentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HorariosFuncionamentoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HorariosFuncionamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
