import { TestBed } from '@angular/core/testing';
import { NavigationEnd } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { LuigiAutoRoutingService } from './luigi-auto-routing.service';
import { LuigiContextService } from './luigi-context-service';

describe('LuigiAutoRoutingService', () => {
  let service: LuigiAutoRoutingService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LuigiAutoRoutingService, LuigiContextService],
      imports: [RouterTestingModule.withRoutes([])]
    });
    service = TestBed.inject(LuigiAutoRoutingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('doFilter', () => {
    it('doFilter should return a function', () => {
      expect(service.doFilter()).toBeInstanceOf(Function);
    });

    it('doFilter should return a function that takes an event keeps it if that event is a NavigationEnd event', () => {
      const event = new NavigationEnd(0, 'url', 'urlAfterRedirects');
      const event$ = of(event);
      const filterResult$ = service.doFilter()(event$);

      filterResult$.subscribe(result => {
        expect(result).toBeInstanceOf(NavigationEnd);
      });
    });

    it('doFilter should return a function that takes an event and filters it out if it is not a NavigationEnd event', () => {
      const event = new NavigationEnd(0, 'url', 'urlAfterRedirects');
      const notAnEvent = new Object();
      const wrongEvent = new CustomEvent('wrongEvent');
      const events$ = of(notAnEvent, event, wrongEvent);
      const filterResult$ = service.doFilter()(events$);
      let count = 0;

      filterResult$.subscribe({
        next: result => {
          expect(result).toBeInstanceOf(NavigationEnd);
          count++;
        },
        complete: () => {
          expect(count).toBe(1);
        }
      });
    });
  });
});
