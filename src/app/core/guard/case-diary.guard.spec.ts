import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { caseDiaryGuard } from './case-diary.guard';

describe('caseDiaryGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => caseDiaryGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
