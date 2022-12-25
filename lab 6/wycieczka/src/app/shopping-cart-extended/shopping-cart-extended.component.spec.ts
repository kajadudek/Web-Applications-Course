import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoppingCartExtendedComponent } from './shopping-cart-extended.component';

describe('ShoppingCartExtendedComponent', () => {
  let component: ShoppingCartExtendedComponent;
  let fixture: ComponentFixture<ShoppingCartExtendedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShoppingCartExtendedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShoppingCartExtendedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
