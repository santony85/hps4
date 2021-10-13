import { TestBed } from '@angular/core/testing';

import { HammergestureconfigService } from './hammergestureconfig.service';

describe('HammergestureconfigService', () => {
  let service: HammergestureconfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HammergestureconfigService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
