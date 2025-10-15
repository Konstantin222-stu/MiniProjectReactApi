export const MAIN_ROUTE = '/' as const;
export const PRODUCT_ROUTE = "/product/:id" as const;
export const ADMIN_ROUTE = '/admin' as const;
export const ADMIN_PRODUCT_ROUTE = '/admin/product' as const;
export const ADMIN_PROMOTION_ROUTE = '/admin/promotion' as const;


export type AppRoute = 
  | typeof MAIN_ROUTE
  | typeof PRODUCT_ROUTE
  | typeof ADMIN_ROUTE
  | typeof ADMIN_PRODUCT_ROUTE
  | typeof ADMIN_PROMOTION_ROUTE;