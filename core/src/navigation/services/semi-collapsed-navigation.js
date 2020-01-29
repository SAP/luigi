import { NavigationHelpers } from '../../utilities/helpers';
import { LuigiConfig } from '../../core-api';
import { CSS_BREAKPOINTS } from '../../utilities/constants';

class SemiCollapsibleNavigationClass {
  initial() {
    this.responsiveNavSetting = LuigiConfig.getConfigValue(
      'settings.responsiveNavigation'
    );
    this.semiCollapsible =
      this.responsiveNavSetting === 'semiCollapsible' || 'Fiori3';

    // set this.isSemiCollapsed to true for mobile
    if (
      this.semiCollapsible &&
      window.innerWidth < CSS_BREAKPOINTS.desktopMinWidth
    ) {
      this.setCollapsed(true);
    }
    this.isSemiCollapsed = this.semiCollapsible ? this.getCollapsed() : false;
    this.setCollapsed(this.isSemiCollapsed);

    this.previousWindowWidth = window.innerWidth;

    return {
      isSemiCollapsed: this.isSemiCollapsed,
      semiCollapsible: this.semiCollapsible
    };
  }

  onValueChanged(fn) {
    if (this.valueChangedFns) {
      this.valueChangedFns.push(fn);
    } else {
      this.valueChangedFns = [fn];
    }
  }

  onResize(selectedCategory) {
    if (this.semiCollapsible) {
      const isDesktopToMobile =
        window.innerWidth < CSS_BREAKPOINTS.desktopMinWidth &&
        this.previousWindowWidth >= CSS_BREAKPOINTS.desktopMinWidth;
      if (isDesktopToMobile) {
        this.setCollapsed(true);
      }
      selectedCategory = this.closePopupMenu(selectedCategory);
      return { isSemiCollapsed: this.isSemiCollapsed, selectedCategory };
    }
  }

  setCollapsed(state) {
    document.body.classList.remove('semiCollapsed');
    // add if true
    if (state) {
      document.body.classList.add('semiCollapsed');
    }
    // initial state
    this.isSemiCollapsed = state;
    localStorage.setItem(NavigationHelpers.COL_NAV_KEY, state);

    if (this.valueChangedFns instanceof Array) {
      this.valueChangedFns.forEach(fn =>
        fn({
          isSemiCollapsed: this.isSemiCollapsed
        })
      );
    }
  }

  getCollapsed() {
    return localStorage.getItem(NavigationHelpers.COL_NAV_KEY) === 'true';
  }

  closePopupMenu(selectedCategory) {
    if (selectedCategory) {
      selectedCategory = null;
      document
        .getElementsByClassName('fd-app__sidebar')[0]
        .classList.remove('isBlocked');
    }
    return selectedCategory;
  }

  buttonClicked(el) {
    this.closePopupMenu();
    if (!this.getCollapsed()) {
      this.setCollapsed(true);

      //Force browser to re-render vertical scrollbar
      document
        .getElementsByClassName('lui-fd-side-nav-wrapper')[0]
        .setAttribute('style', 'overflow-y:hidden;');
      window.setTimeout(function() {
        document
          .getElementsByClassName('lui-fd-side-nav-wrapper')[0]
          .setAttribute('style', 'overflow-y:auto;');
      });
    } else {
      this.setCollapsed(false);
    }

    return this.isSemiCollapsed;
  }
}

export const SemiCollapsibleNavigation = new SemiCollapsibleNavigationClass();
