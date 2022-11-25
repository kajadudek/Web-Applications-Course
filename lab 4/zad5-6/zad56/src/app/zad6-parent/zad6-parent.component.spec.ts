import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Zad6ParentComponent } from './zad6-parent.component';

describe('Zad6ParentComponent', () => {
  let component: Zad6ParentComponent;
  let fixture: ComponentFixture<Zad6ParentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Zad6ParentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Zad6ParentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
