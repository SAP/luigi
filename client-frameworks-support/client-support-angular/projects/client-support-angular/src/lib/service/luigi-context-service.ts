import { Context } from '@luigi-project/client';
import { Observable } from 'rxjs';

export abstract class LuigiContextService {
  /**
   * Listen to context changes
   * Receives current value, even if the event was already dispatched earlier.
   */
  abstract contextObservable(): Observable<IContextMessage>;

  /**
   * Get latest context object
   */
  abstract getContext(): Context;
}

export enum ILuigiContextTypes {
  INIT,
  UPDATE
}

export interface IContextMessage {
  contextType: ILuigiContextTypes; // will be init or update
  context: Context;
}
