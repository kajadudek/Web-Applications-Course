import { TestBed } from '@angular/core/testing';

import { NonGuestGuard } from './non-guest.guard';

describe('NonGuestGuard', () => {
  let guard: NonGuestGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(NonGuestGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
