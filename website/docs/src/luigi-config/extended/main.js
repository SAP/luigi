// import { auth } from './auth';
import { navigation } from './navigation';
import { routing } from './routing';
import { settings } from './settings';
import { search } from './search';

Luigi.setConfig({
  // auth,
  navigation,
  routing,
  settings,
  lifecycleHooks: {
    luigiAfterInit: () => {
      search.init();
    },
    events: (name, data) => {
      console.log('lfh.events', name, data);
    }
  }
});
