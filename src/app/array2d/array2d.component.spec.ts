import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Array2dComponent } from './array2d.component';

describe('Array2dComponent', () => {
  let component: Array2dComponent;
  let fixture: ComponentFixture<Array2dComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Array2dComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Array2dComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
