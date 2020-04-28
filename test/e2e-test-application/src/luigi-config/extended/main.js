import { auth } from './auth';
import { navigation } from './navigation';
import { routing } from './routing';
import { settings } from './settings';
import { communication } from './communication';
import { lifecycleHooks } from './lifecycle-hooks';
import { globalSearch } from './globalSearch';
import { i18nProvider } from './i18n-provider';

i18nProvider.init().then(trans => {
  Luigi.setConfig({
    auth,
    navigation,
    routing,
    settings,
    communication,
    lifecycleHooks,
    globalSearch
  });
});
