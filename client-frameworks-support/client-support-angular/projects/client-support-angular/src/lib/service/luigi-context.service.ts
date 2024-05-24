import { Context } from '@luigi-project/client';
import { Observable } from 'rxjs';
import { IContextMessage } from './luigi-context.model';

export abstract class LuigiContextService {
  /**
   * Listen to context changes
   * Receives current value, even if the event was already dispatched earlier.
   */
  abstract contextObservable(): Observable<IContextMessage>;

  /**
   * Get latest set context object
   */
  abstract getContext(): Context;

  /**
   * Get a promise that resolves when context is set.
   */
  abstract getContextAsync(): Promise<Context>;
}
