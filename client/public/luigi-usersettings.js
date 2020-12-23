class LuigiUserSettings {
    constructor() {
        this.userSettings;
        this.init();
        this._onInitFns={};
    }

    init(){
         window.parent.postMessage(
            {
                msg: 'readUserSettings',
            },
            '*'
        );
        let that =this;
         window.addEventListener('message', e => {
            if("userSettingsObj" == e.data.msg){
                that.userSettings = e.data.data;
                console.log('us obj ', that.userSettings);
                that.luigiInitialized=true;
                that._onInitFns["123"](that.userSettings);
            }
        });
       
    }

    /**
    * Registers a listener called with the context object and the Luigi Core domain as soon as Luigi is instantiated. Defer your application bootstrap if you depend on authentication data coming from Luigi.
    * @param {Lifecycle~initListenerCallback} initFn the function that is called once Luigi is initialized, receives current context and origin as parameters
    * @memberof Lifecycle
    * @example
    * const initListenerId = LuigiClient.addInitListener((context) => storeContextToMF(context))
    */
    addInitListener(initFn) {

        const id = "123";
        this._onInitFns[id] = initFn;
        if (this.luigiInitialized ) {
            initFn(this.userSettings);
        }
        return id;
    }

    _notifyInit(origin) {
    this._callAllFns(this._onInitFns, this.currentContext.context, origin);
  }

    storeUserSettings(usersettingsobj, previoususersettingsobj) {

    }

    readUserSettings() {
       return this.userSettings;
    }

}