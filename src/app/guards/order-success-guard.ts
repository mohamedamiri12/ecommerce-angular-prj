import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { EcommerceStore } from "../ecommerce-store";

export const orderSuccessGuard: CanActivateFn = () => {
    const store = inject(EcommerceStore);
    return store.lastOrder() ? true : inject(Router).createUrlTree(['/products/all'])
}