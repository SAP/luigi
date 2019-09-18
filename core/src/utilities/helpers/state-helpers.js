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
    return result;
  }

  expandScope(scope) {
    const result = [];
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
    store.subscribe(fn);
    this.expandScope(scope).forEach(s => {
      store.subscribeToScope(fn, s);
    });
  }
}

export const StateHelpers = new StateHelpersClass();
