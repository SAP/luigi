import { Injectable } from '@angular/core';
import { ReplaySubject, Observable } from 'rxjs';
import { Context, addInitListener, addContextUpdateListener } from '@luigi-project/client';

export type ILuigiContextTypes = 'init' | 'update';
export interface IContextMessage {
  contextType: ILuigiContextTypes; // will be init or update
  context: Context;
}

@Injectable({
  providedIn: 'root'
})
export class LuigiContextService {
  private static currentContext: IContextMessage = null as unknown as IContextMessage;
  private subject: ReplaySubject<IContextMessage> = new ReplaySubject<IContextMessage>(1);


  constructor() {
    addInitListener(initialContext => {
      this.setContext({
        contextType: 'init',
        context: initialContext
      });
    });
    addContextUpdateListener(updatedContext => {
      this.setContext({
        contextType: 'update',
        context: updatedContext
      });
    });
   }

  /**
   * Set current context
   */
  private setContext(obj: IContextMessage): void {
    LuigiContextService.currentContext = obj;
    this.subject.next(obj);
  }

  /**
   * Listen to context changes
   * Receives current value, even if the event was already dispatched earlier.
   */
  public contextObservable(): Observable<IContextMessage> {
    return this.subject.asObservable();
  }

  /**
   * Get latest context object retrieved from luigi core application or none, if not yet set.
   */
  public getCurrentContext(): Context {
    return LuigiContextService.currentContext && LuigiContextService.currentContext.context;
  }
}
