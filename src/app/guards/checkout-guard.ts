import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { EcommerceStore } from "../ecommerce-store";

export const checkoutGuard: CanActivateFn = () => {
    const store = inject(EcommerceStore);
    const router = inject(Router);

    if(!store.user()) {
        return router.createUrlTree(['/products/all'])
    }
    if(store.cartCount() === 0) {
        return router.createUrlTree(['/cart'])
    }
    return true;

}