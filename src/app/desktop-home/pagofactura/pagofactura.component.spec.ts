import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagofacturaComponent } from './pagofactura.component';

describe('PagofacturaComponent', () => {
  let component: PagofacturaComponent;
  let fixture: ComponentFixture<PagofacturaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PagofacturaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PagofacturaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
