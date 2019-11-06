const version = 'none';

class Settings {
  header = {
    logo: 'logo.svg',
    favicon: 'favicon.png'
  };

  responsiveNavigation = 'simpleMobileOnly'; // Options: simple | simpleMobileOnly | semiCollapsible
  // sideNavFooterText = `Luigi Version: ${version || 'unknown'}`;
  // hideNavigation = true
  // backdropDisabled = true
}

export const settings = new Settings();
