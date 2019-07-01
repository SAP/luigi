class StateHelpersClass {
  doOnStoreChange(store, fn, events = []) {
    const evs = events;
    if (evs.indexOf('state') === -1) {
      evs.push('state');
    }
    // register listener for store event(s)
    evs.forEach(e => {
      store.on(e, fn);
    });
    // and call the listener once specifically, immediately:
    fn({
      current: store.get(),
      changed: { config: true },
      previous: store.get()
    });
  }
}

export const StateHelpers = new StateHelpersClass();
