import { TestBed } from '@angular/core/testing';

import { SnackAlertService } from './snack-alert.service';

describe('SnackAlertService', () => {
  let service: SnackAlertService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SnackAlertService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
