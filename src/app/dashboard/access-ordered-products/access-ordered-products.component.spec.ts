import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccessOrderedProductsComponent } from './access-ordered-products.component';

describe('AccessOrderedProductsComponent', () => {
  let component: AccessOrderedProductsComponent;
  let fixture: ComponentFixture<AccessOrderedProductsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccessOrderedProductsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccessOrderedProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
