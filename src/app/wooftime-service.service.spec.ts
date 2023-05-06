import { TestBed } from '@angular/core/testing';

import { WooftimeServiceService } from './wooftime-service.service';

describe('WooftimeServiceService', () => {
  let service: WooftimeServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WooftimeServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
