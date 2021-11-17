class GlobalSearchHelperClass {
    constructor() {}

    calculateGlobalSearchCtnWidth(){
        if(document.querySelector('.lui-global-search')){
            return document.querySelector('.lui-global-search').offsetWidth;
        }
        return null;        
    }
}

export const GlobalSearchHelper = new GlobalSearchHelperClass();