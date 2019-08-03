import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMeasureStockComponent } from './add-measure-stock.component';

describe('AddMeasureStockComponent', () => {
  let component: AddMeasureStockComponent;
  let fixture: ComponentFixture<AddMeasureStockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddMeasureStockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMeasureStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
