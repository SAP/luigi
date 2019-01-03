import { auth } from './auth';
import { navigation } from './navigation';
import { routing } from './routing';
import { settings } from './settings';
// require('webpack').BannerPlugin({
//   banner: 'hello world'
// });

Luigi.setConfig({
  auth,
  navigation,
  routing,
  settings
});
