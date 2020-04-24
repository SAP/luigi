const version = 'none';

class Settings {
  header = {
    title: 'Documentation - Luigi - The Enterprise-Ready Micro Frontend Framework',
    logo: '/logo.svg',
    favicon: '/favicon.png'
  };

  responsiveNavigation = 'simpleMobileOnly'; // Options: simple | simpleMobileOnly | semiCollapsible
  sideNavFooterText = ' ';
  customSandboxRules = ['allow-presentation']
  // hideNavigation = true
  // backdropDisabled = true
}

export const settings = new Settings();
