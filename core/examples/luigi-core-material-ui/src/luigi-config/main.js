import { navigation } from './navigation';
import { routing } from './routing';
import { settings } from './settings';

Luigi.setConfig({
  navigation,
  routing,
  settings
  //   lifecycleHooks: {
  //     luigiAfterInit: () => {
  //       search.init();
  //     }
  //   }
});
