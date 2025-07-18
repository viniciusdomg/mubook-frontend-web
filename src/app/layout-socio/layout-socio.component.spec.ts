import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutSocioComponent } from './layout-socio.component';

describe('LayoutSocioComponent', () => {
  let component: LayoutSocioComponent;
  let fixture: ComponentFixture<LayoutSocioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LayoutSocioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LayoutSocioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
