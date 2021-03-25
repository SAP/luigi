/**
 * ViewUrl Decorator Service
 * manages a list of decorators that will be applied to all viewUrls right before iframe creation
 *
 * interface decorator {
 *   uid: string; // identifier of the current decorator. required to replace it after config update
 *   type: enum; // queryString
 *   key: string;
 *   valueFn: function; // a callback function that returns a string
 * }
 */

import { GenericHelpers } from '../utilities/helpers';

class ViewUrlDecoratorSvc {
  constructor() {
    this.decorators = [];
  }

  hasDecorators() {
    return this.decorators.length > 0;
  }

  add(decorator) {
    this.decorators = this.decorators
      .filter(d => d.uid !== decorator.uid)
      .concat(decorator);
  }

  applyDecorators(url) {
    if (!url) {
      return url;
    }
    const urlObj = new URL(GenericHelpers.prependOrigin(url));
    // apply query params
    const queryParamDecorators = this.decorators.filter(
      d => d.type === 'queryString'
    );
    for (let i = 0; i < queryParamDecorators.length; i++) {
      const decorator = queryParamDecorators[i];
      if (urlObj.searchParams.has(decorator.key)) {
        urlObj.searchParams.delete(decorator.key);
      }
      const value = decorator.valueFn();
      urlObj.searchParams.append(decorator.key, value);
    }
    return urlObj.href;
  }
}

export const ViewUrlDecorator = new ViewUrlDecoratorSvc();
