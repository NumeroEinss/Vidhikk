import { TestBed } from '@angular/core/testing';

import { PaaymentService } from './paayment.service';

describe('PaaymentService', () => {
  let service: PaaymentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PaaymentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
