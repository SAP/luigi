import { ActivatedRouteSnapshot, DetachedRouteHandle } from "@angular/router";
import { LuigiRouteStrategy } from "@luigi-project/client-support-angular/lib/route/luigi-route-strategy";

export class YourLuigiRouteStrategy extends LuigiRouteStrategy {

    retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle {
        return super.retrieve(route);
        // Your code
    }
 
 }
