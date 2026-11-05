import { computed, inject } from '@angular/core';
import { Product } from './models/product';
import {
  patchState,
  signalMethod,
  signalStore,
  withComputed,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { produce } from 'immer';
import { Toaster } from './services/toaster';
import { CartItem } from './models/cart';
import { MatDialog } from '@angular/material/dialog';
import { SignInDialog } from './components/sign-in-dialog/sign-in-dialog';
import { SignInParams, SignUpParams, User } from './models/user';
import { Router } from '@angular/router';
import { Order } from './models/order';
import { withStorageSync } from '@angular-architects/ngrx-toolkit';
import { ProductsApi } from './services/products-api';
import { first, firstValueFrom } from 'rxjs';
import { AuthApi } from './services/auth-api';

const PAGE_SIZE = 12;

export type EcommerceState = {
  products: Product[];
  category: string;
  wishlistItems: Product[];
  cartItems: CartItem[];
  user: User | undefined;
  loading: boolean;
  selectedProductId: string | undefined;
  lastOrder: Order | undefined;
  productsLoading: boolean;
  searchTerm: string;
  sortBy: SortOption;
  page: number;
};

export type SortOption = 'default' | 'price-asc' | 'price-desc' | 'rating';

export const EcommerceStore = signalStore(
  {
    providedIn: 'root',
  },
  withState({
    products: [],
    category: 'all',
    wishlistItems: [],
    cartItems: [],
    user: undefined,
    loading: false,
    selectedProductId: undefined,
    lastOrder: undefined,
    productsLoading: false,
    searchTerm: '',
    sortBy: 'default',
    page: 1,
  } as EcommerceState),
  withStorageSync({
    key: 'modern-store',
    select: ({ wishlistItems, cartItems, user }) => ({ wishlistItems, cartItems, user }),
  }),
  withComputed(
    ({ category, products, wishlistItems, cartItems, selectedProductId, searchTerm, sortBy }) => ({
      filteredProducts: computed(() => {
        const term = searchTerm().trim().toLocaleLowerCase();
        const result = products().filter(
          (p) =>
            (category() === 'all' || p.category.toLowerCase() === category().toLowerCase()) &&
            (!term || p.name.toLowerCase().includes(term)),
        );

        if (sortBy() === 'price-asc') {
          result.sort((a, b) => a.price - b.price);
        } else if (sortBy() === 'price-desc') {
          result.sort((a, b) => b.price - a.price);
        } else if (sortBy() === 'rating') {
          result.sort((a, b) => b.rating - a.rating);
        }

        return result;
      }),
      wishlistCount: computed(() => wishlistItems().length),
      cartCount: computed(() => cartItems().reduce((acc, item) => acc + item.quantity, 0)),
      selectedProduct: computed(() => products().find((p) => p.id === selectedProductId())),
      categories: computed(() => ['all', ...new Set(products().map((p) => p.category))]),
    }),
  ),
  withComputed(({ filteredProducts, page }) => ({
    totalPages: computed(() => Math.max(1, Math.ceil(filteredProducts().length / PAGE_SIZE))),
    pagedProducts: computed(() => {
      const start = (page() - 1) * PAGE_SIZE;
      return filteredProducts().slice(start, start + PAGE_SIZE);
    }),
  })),
  withMethods(
    (
      store,
      toaster = inject(Toaster),
      matDialog = inject(MatDialog),
      router = inject(Router),
      productsApi = inject(ProductsApi),
      authApi = inject(AuthApi),
    ) => ({
      setCategory: signalMethod<string>((category: string) => {
        patchState(store, { category, page: 1 });
      }),
      setProductId: signalMethod<string>((productId: string) => {
        patchState(store, { selectedProductId: productId });
      }),
      addToWishlist: (product: Product) => {
        const updatedWishlistItems = produce(store.wishlistItems(), (draft) => {
          if (!draft.find((p) => p.id === product.id)) {
            draft.push(product);
          }
        });

        patchState(store, { wishlistItems: updatedWishlistItems });
        toaster.success('Product added to wishlist');
      },
      removeFromWishlist: (product: Product) => {
        patchState(store, {
          wishlistItems: store.wishlistItems().filter((p) => p.id !== product.id),
        });
        toaster.success('Product removed from wishlist');
      },
      clearWishlist: () => {
        patchState(store, {
          wishlistItems: [],
        });
        toaster.success('wishlist cleared succesfully');
      },
      addToCart: (product: Product, quantity = 1) => {
        const existingItemIndex = store
          .cartItems()
          .findIndex((item) => item.product.id === product.id);

        const updatedCartItems = produce(store.cartItems(), (draft) => {
          if (existingItemIndex !== -1) {
            draft[existingItemIndex].quantity += quantity;
            return;
          }
          draft.push({ product, quantity });
        });

        patchState(store, { cartItems: updatedCartItems });
        toaster.success(
          existingItemIndex !== -1 ? 'Product added again' : 'Product added to the cart',
        );
      },

      setItemQuantity: (params: { productId: string; quantity: number }) => {
        const index = store.cartItems().findIndex((i) => i.product.id === params.productId);
        const updated = produce(store.cartItems(), (draft) => {
          draft[index].quantity = params.quantity;
        });
        patchState(store, { cartItems: updated });
      },

      addAllWishlistToCart: () => {
        const updatedCartItems = produce(store.cartItems(), (draft) => {
          store.wishlistItems().forEach((p) => {
            if (p.inStock && !draft.find((c) => c.product.id === p.id)) {
              draft.push({ product: p, quantity: 1 });
            }
          });
        });

        const remainingWishlist = store.wishlistItems().filter((p) => !p.inStock);

        patchState(store, { cartItems: updatedCartItems, wishlistItems: remainingWishlist });
      },

      moveToWishlist: (product: Product) => {
        const updatedCartItems = store.cartItems().filter((p) => p.product.id !== product.id);
        const updatedWishlistItems = produce(store.wishlistItems(), (draft) => {
          if (!draft.find((p) => p.id === product.id)) draft.push(product);
        });

        patchState(store, { cartItems: updatedCartItems, wishlistItems: updatedWishlistItems });
      },

      removeFromCart: (product: Product) => {
        patchState(store, {
          cartItems: store.cartItems().filter((p) => p.product.id !== product.id),
        });
      },

      proceedToCheckout: () => {
        if (!store.user()) {
          matDialog.open(SignInDialog, {
            disableClose: true,
            data: {
              checkout: true,
            },
          });
          return;
        }
        router.navigate(['/checkout']);
      },

      placeOrder: async () => {
        patchState(store, { loading: true });

        const user = store.user();
        if (!user) {
          toaster.error('Please login before placing order');
          patchState(store, { loading: false });
          return;
        }

        const order: Order = {
          id: crypto.randomUUID(),
          userId: user.id,
          total: Math.round(
            store.cartItems().reduce((acc, item) => acc + item.quantity * item.product.price, 0),
          ),
          items: store.cartItems(),
          paymentStatus: 'success',
        };

        await new Promise((resolve) => setTimeout(resolve, 1000));

        patchState(store, { loading: false, cartItems: [], lastOrder: order });
        router.navigate(['order-success']);
      },

      signIn: async ({ username, password, checkout, dialogId }: SignInParams) => {
        patchState(store, { loading: true });

        try {
          const user = await firstValueFrom(authApi.login(username, password));
          patchState(store, { user, loading: false });
          matDialog.getDialogById(dialogId)?.close();

          if (checkout) {
            router.navigate(['/checkout']);
          }
        } catch {
          patchState(store, {loading: false})
          toaster.error("Wrong username or password")
        }
      },

      signUp: ({ email, password, name, checkout, dialogId }: SignUpParams) => {
        patchState(store, {
          user: {
            id: '1',
            email,
            name,
            imageUrl: 'https://randomuser.me/api/portraits/men/13.jpg',
          },
        });
        matDialog.getDialogById(dialogId)?.close();

        if (checkout) {
          router.navigate(['/checkout']);
        }
      },

      signOut: () => {
        patchState(store, { user: undefined });
      },
      loadProducts: async () => {
        patchState(store, { productsLoading: true });
        try {
          const products = await firstValueFrom(productsApi.getProducts());
          const cartItems = store.cartItems().flatMap((item) => {
            const fresh = products.find((p) => p.id === item.product.id);
            return fresh ? [{ ...item, product: fresh }] : [];
          });

          const wishlistItems = store
            .wishlistItems()
            .map((saved) => products.find((p) => p.id === saved.id))
            .filter((p) => p !== undefined);

          patchState(store, { products, cartItems, wishlistItems, productsLoading: false });
        } catch {
          patchState(store, { productsLoading: false });
          toaster.error('could not load products');
        }
      },
      setSearchTerm: (searchTerm: string) => {
        patchState(store, { searchTerm, page: 1 });
      },
      setSortBy: (sortBy: SortOption) => {
        patchState(store, { sortBy, page: 1 });
      },
      setPage: (page: number) => {
        patchState(store, { page });
      },
    }),
  ),
  withHooks({
    onInit: (store) => store.loadProducts(),
  }),
);
