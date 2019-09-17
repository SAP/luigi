class StateHelpersClass {
  optimizeScope(scope) {
    let last = '';
    const result = [];
    [...scope].sort().forEach(s => {
      if (s && !result.includes(s)) {
        if (!last || s.indexOf(last) !== 0) {
          result.push(s);
          last = s;
        }
      }
    });
    if (result.length === 0) {
      result.push('state');
    }
    return result;
  }

  expandScope(scope) {
    const result = ['state'];
    scope.forEach(s => {
      let subs = '';
      s.split('.').forEach(spart => {
        subs = subs + (subs ? '.' : '') + spart;
        result.push(subs);
      });
    });
    return [...new Set(result)];
  }

  doOnStoreChange(store, fn, scope = []) {
    // register listener for store event(s)
    this.expandScope(scope).forEach(e => {
      store.subscribe(fn);
    });
    // and call the listener once specifically, immediately:
    /*fn({
      current: store,
      changed: { config: true },
      previous: store
    });*/
  }
}

export const StateHelpers = new StateHelpersClass();
