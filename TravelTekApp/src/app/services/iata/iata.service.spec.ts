import { TestBed } from '@angular/core/testing';

import { IataService } from './iata.service';

describe('IataService', () => {
  let service: IataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
