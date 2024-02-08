import { TestBed } from '@angular/core/testing';
import { LuigiAutoRoutingService } from './luigi-auto-routing.service';
import { LuigiContextService } from './luigi-context-service';

describe('LuigiAutoRoutingService', () => {
  let service: LuigiAutoRoutingService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LuigiContextService]
    });
    service = TestBed.inject(LuigiAutoRoutingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
