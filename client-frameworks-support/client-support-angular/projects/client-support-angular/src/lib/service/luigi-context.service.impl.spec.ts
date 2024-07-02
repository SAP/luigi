import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { Context } from '@luigi-project/client';
import { IContextMessage, ILuigiContextTypes } from './luigi-context.model';
import { LuigiContextServiceImpl } from './luigi-context.service.impl';

describe('LuigiContextService', () => {
  const mockedContext: Context = {anchor: 'root'};
  let service: LuigiContextServiceImpl;

  beforeEach(() => {
    TestBed.configureTestingModule({});

    service = TestBed.inject(LuigiContextServiceImpl);
    (service as any).currentContext = {context: mockedContext, contextType: ILuigiContextTypes.INIT} as IContextMessage;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add listener', () => {
    spyOn(service as any, 'setContext').and.callThrough();
    service.addListener(ILuigiContextTypes.INIT, mockedContext);
    expect((service as any).setContext).toHaveBeenCalledWith({
      contextType: ILuigiContextTypes.INIT,
      context: mockedContext,
    } as IContextMessage);
  });

  it('should get context', () => {
    spyOn(service, 'getContext').and.callThrough();
    expect(service.getContext()).toEqual(mockedContext);
    expect(service.getContext).toHaveBeenCalled();
  });

  it('should get context async', fakeAsync(() => {
    spyOn(service, 'getContextAsync').and.callThrough();
    service.getContextAsync().then((context) => {
      expect(context).toEqual(mockedContext);
    });
    tick();
    expect(service.getContextAsync).toHaveBeenCalled();
  }));
});
