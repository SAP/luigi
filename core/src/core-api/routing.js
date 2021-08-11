import { LuigiConfig } from ".";
import { GenericHelpers } from "../utilities/helpers";
/**
 * @name Routing
 */
class LuigiRouting {
    /**
     * Use these functions for navigation-related features.
     * @name Routing
     */
    constructor() {}

    /**
     * Get search parameter from url as object.
     * @memberof Routing
     * @since NEXTRELEASE
     * @returns {Object}
     * @example
     * Luigi.routing().getSearchParams();
     */
    getSearchParams(){
        const queryParams={};
        const url = new URL(location);
        if(LuigiConfig.getConfigValue('routing.useHashRouting')){
            let queryParamsString = url.hash.split("?")[1];
            if (!queryParamsString) return {};
            return queryParamsString.split("&").reduce(
                (queryParams, param) => {
                    var [key, value] = param.split("=");
                    queryParams[key] = value;
                    return queryParams;
                },{});
        }else{
            for(const [key, value] of url.searchParams.entries()) {
                queryParams[key]=value;
             }
            return queryParams;
        }
    }

    /**
     * Set search parameter to url.
     * If hash routing is enabled the search parameters will be set after the hash.
     * If there are already search params they will be overwritten.
     * @memberof Routing
     * @since NEXTRELEASE
     * @param {Object} params 
     * @example
     * Luigi.routing().setSearchParams({luigi:'rocks'});
     */
    setSearchParams(params){
        if(!GenericHelpers.isObject(params)){
            console.log('Params argument must be an object');
        }else{
            const url = new URL(location);
            if(LuigiConfig.getConfigValue('routing.useHashRouting')){
                let [hashvalue, queryParamsString] = url.hash.split('?');
                queryParamsString='';
                for (const [key, value] of Object.entries(params)) {
                    if(queryParamsString!==''){
                        queryParamsString +='&'
                    }
                    queryParamsString += `${key}=${value}`;
                }
                url.hash = `${hashvalue}?${queryParamsString}`;
            }else{
                const keys=[];
                for (let key of url.searchParams.keys()){
                    keys.push(key);
                }
                keys.forEach((key)=>{
                    url.searchParams.delete(key);
                });
                for (const [key, value] of Object.entries(params)) {
                    url.searchParams.set(key, value);
                }
            }
            window.history.pushState({}, '', url.href);
        }
    }

    stringQueryParamsToObj(value){
        
    }
}

export const routing = new LuigiRouting();