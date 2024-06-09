import { TestBed } from '@angular/core/testing';

import { FournissursService } from './fournissurs.service';

describe('FournissursService', () => {
  let service: FournissursService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FournissursService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
