import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MeasureAndStocksComponent } from './measure-and-stocks.component';

describe('MeasureAndStocksComponent', () => {
  let component: MeasureAndStocksComponent;
  let fixture: ComponentFixture<MeasureAndStocksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MeasureAndStocksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MeasureAndStocksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
