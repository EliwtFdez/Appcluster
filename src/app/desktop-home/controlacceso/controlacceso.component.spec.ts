import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlaccesoComponent } from './controlacceso.component';

describe('ControlaccesoComponent', () => {
  let component: ControlaccesoComponent;
  let fixture: ComponentFixture<ControlaccesoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ControlaccesoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ControlaccesoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
