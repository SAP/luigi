import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { LuigiAutoRoutingService } from './luigi-auto-routing.service';
import { LuigiContextService } from './luigi-context-service';

describe('LuigiAutoRoutingService', () => {
  let service: LuigiAutoRoutingService;
  let luigiContextService = {};

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([])],
      providers: [{ provide: LuigiContextService, use: luigiContextService }]
    });
    service = TestBed.inject(LuigiAutoRoutingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
