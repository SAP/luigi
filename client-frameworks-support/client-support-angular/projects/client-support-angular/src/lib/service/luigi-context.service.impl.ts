import { Injectable, NgZone } from '@angular/core';
import { ReplaySubject, Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import { Context, addInitListener, addContextUpdateListener } from '@luigi-project/client';
import { IContextMessage, ILuigiContextTypes, LuigiContextService } from './luigi-context-service';

@Injectable({
  providedIn: 'root'
})
export class LuigiContextServiceImpl implements LuigiContextService {
  private subject: ReplaySubject<IContextMessage> = new ReplaySubject<IContextMessage>(1);
  private currentContext: IContextMessage = (null as unknown) as IContextMessage;

  constructor(private zone: NgZone) {
    addInitListener(initContext => {
      this.addListener(ILuigiContextTypes.INIT, initContext);
    });
    addContextUpdateListener(updateContext => {
      this.addListener(ILuigiContextTypes.UPDATE, updateContext);
    });
  }

  public contextObservable(): Observable<IContextMessage> {
    return this.subject.asObservable();
  }

  /**
   * Get latest context object retrieved from luigi core application or none, if not yet set.
   */
  public getContext(): Context {
    return this.currentContext && this.currentContext.context;
  }

  /**
   * Get a promise that resolves when context is set.
   */
  public getContextAsync(): Promise<Context> {
    return new Promise<Context>((resolve, reject) => {
      if (this.getContext()) {
        resolve(this.getContext());
      } else {
        this.contextObservable()
          .pipe(first())
          .subscribe(ctx => {
            resolve(ctx.context);
          });
      }
    });
  }

  /**
   * Set current context
   */
  protected setContext(obj: IContextMessage): void {
    this.zone.run(() => {
      this.currentContext = obj;
      this.subject.next(obj);
    });
  }

  addListener(contextType: ILuigiContextTypes, context: Context): void {
    this.setContext({
      contextType,
      context
    } as IContextMessage);
  }
}
