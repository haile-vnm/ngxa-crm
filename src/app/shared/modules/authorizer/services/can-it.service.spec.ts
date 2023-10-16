import { TestBed } from '@angular/core/testing';

import { CanItService } from './can-it.service';

describe('CanItService', () => {
  let service: CanItService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CanItService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
