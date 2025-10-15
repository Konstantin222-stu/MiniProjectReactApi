import type { ComponentType } from "react";
import type { ADMIN_PRODUCT_ROUTE, ADMIN_PROMOTION_ROUTE, ADMIN_ROUTE, MAIN_ROUTE, PRODUCT_ROUTE } from "../router/path";

export interface RouteConfig {
    path: AppRoute;
    Component: ComponentType;
}

export type AppRoute = 
  | typeof MAIN_ROUTE
  | typeof PRODUCT_ROUTE
  | typeof ADMIN_ROUTE
  | typeof ADMIN_PRODUCT_ROUTE
  | typeof ADMIN_PROMOTION_ROUTE;