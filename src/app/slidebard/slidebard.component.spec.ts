import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SlidebardComponent } from './slidebard.component';

describe('SlidebardComponent', () => {
  let component: SlidebardComponent;
  let fixture: ComponentFixture<SlidebardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SlidebardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SlidebardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
