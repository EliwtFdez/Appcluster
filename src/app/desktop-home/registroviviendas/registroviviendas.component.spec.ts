import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroviviendasComponent } from './registroviviendas.component';

describe('RegistroviviendasComponent', () => {
  let component: RegistroviviendasComponent;
  let fixture: ComponentFixture<RegistroviviendasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistroviviendasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistroviviendasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
