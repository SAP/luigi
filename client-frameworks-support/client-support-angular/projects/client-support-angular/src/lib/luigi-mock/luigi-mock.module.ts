import { APP_INITIALIZER, NgModule } from '@angular/core';
import { LuigiMockEngine } from '../../../../../../testing-utilities/dist/';

// @dynamic
@NgModule({
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: LuigiMockEngine.initPostMessageHook,
      multi: true
    }
  ]
})
export class LuigiMockModule {}
