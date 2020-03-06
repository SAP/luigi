// import { auth } from './auth';
import { navigation } from './navigation';
import { routing } from './routing';
import { settings } from './settings';
import { search } from './search';

Luigi.setConfig({
  // auth,
  navigation,
  routing,
  settings
});

search.init();