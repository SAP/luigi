import { version } from '../../node_modules/@material-ui/core/package.json';

class Settings {
  header = {
    title: 'Luigi Material-UI',
    subTitle: version || 'unknown',
    favicon: '/favicon.ico'
  };
  appLoadingIndicator = {
    hideAutomatically: true
  };

  sideNavFooterText = `Material-UI: ${version || 'unknown'}`;

  // sideNavCompactMode = true;
  // allowRules = ['microphone'];
  // iframeCreationInterceptor = (iframe, viewGroup, navigationNode, microFrontendType) => { };
  hideNavigation = true;
  // backdropDisabled = true
}

export const settings = new Settings();
