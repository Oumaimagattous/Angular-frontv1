import { TestBed } from '@angular/core/testing';

import { BonEntrersService } from './bon-entrers.service';

describe('BonEntrersService', () => {
  let service: BonEntrersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BonEntrersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
