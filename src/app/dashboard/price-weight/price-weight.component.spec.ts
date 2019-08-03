import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PriceWeightComponent } from './price-weight.component';

describe('PriceWeightComponent', () => {
  let component: PriceWeightComponent;
  let fixture: ComponentFixture<PriceWeightComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PriceWeightComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PriceWeightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
