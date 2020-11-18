import { TestBed } from '@angular/core/testing';

import { LuigiContextService } from './luigi-context.service';

describe('LuigiContextService', () => {
  let service: LuigiContextService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LuigiContextService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
