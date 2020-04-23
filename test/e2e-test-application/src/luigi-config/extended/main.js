import { auth } from './auth';
import { navigation } from './navigation';
import { routing } from './routing';
import { settings } from './settings';
import { communication } from './communication';
import { lifecycleHooks } from './lifecycle-hooks';
import { globalSearch } from './globalSearch';

Luigi.setConfig({
  auth,
  navigation,
  routing,
  settings,
  communication,
  lifecycleHooks,
  globalSearch
});
