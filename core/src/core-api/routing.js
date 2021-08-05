class LuigiRouting {
    /**
     * Use these functions for navigation-related features.
     * @name LuigiRouting
     */
    constructor() {}

    /**
     * 
     */
    getQueryParams(){
        return window.location.search;
    }

    setQueryParams(){
        
    }
}

export const routing = new LuigiRouting();