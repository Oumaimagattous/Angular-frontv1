import { TestBed } from '@angular/core/testing';

import { JournalStockService } from './journal-stock.service';

describe('JournalStockService', () => {
  let service: JournalStockService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JournalStockService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
