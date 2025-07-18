import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservasAgendarComponent } from './reservas-agendar.component';

describe('ReservasAgendarComponent', () => {
  let component: ReservasAgendarComponent;
  let fixture: ComponentFixture<ReservasAgendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReservasAgendarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReservasAgendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
