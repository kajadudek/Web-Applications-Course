import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Zad6InfoCardsComponent } from './zad6-info-cards.component';

describe('Zad6InfoCardsComponent', () => {
  let component: Zad6InfoCardsComponent;
  let fixture: ComponentFixture<Zad6InfoCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Zad6InfoCardsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Zad6InfoCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
