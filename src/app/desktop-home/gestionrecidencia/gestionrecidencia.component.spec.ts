import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionrecidenciaComponent } from './gestionrecidencia.component';

describe('GestionrecidenciaComponent', () => {
  let component: GestionrecidenciaComponent;
  let fixture: ComponentFixture<GestionrecidenciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestionrecidenciaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestionrecidenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
