import type { ComponentType } from 'react';
import { ADMIN_PRODUCT_ROUTE, ADMIN_PROMOTION_ROUTE, ADMIN_ROUTE, MAIN_ROUTE, PRODUCT_ROUTE, type AppRoute } from './path';
import ProductAdmin from '../page/pageAdmin/ProductAdmin'
import PromotionAdmi from '../page/pageAdmin/PromotionAdmin'
import Admin from '../page/pageAdmin/Admin';
import Product from '../page/pagePublick/Product';
import Main from '../page/pagePublick/Main';


export interface RouteConfig {
    path: AppRoute;
    Component: ComponentType;
}

export const publicRoutes: RouteConfig[] = [
    { path: MAIN_ROUTE, Component: Main },
    { path: PRODUCT_ROUTE, Component: Product },
];

export const privateRoutes: RouteConfig[] = [
    { path: ADMIN_ROUTE, Component: Admin },
    { path: ADMIN_PRODUCT_ROUTE, Component: ProductAdmin },
    { path: ADMIN_PROMOTION_ROUTE, Component: PromotionAdmi }
];