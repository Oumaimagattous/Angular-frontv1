import { TestBed } from '@angular/core/testing';

import { JournalCasierService } from './journal-casier.service';

describe('JournalCasierService', () => {
  let service: JournalCasierService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JournalCasierService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
