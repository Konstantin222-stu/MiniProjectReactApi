
import Admin from '../page/pageAdmin/Admin'
import ProductAdmin from '../page/pageAdmin/ProductAdmin'
import PromotionAdmin from '../page/pageAdmin/PromotionAdmin'
import Main from '../page/pagePublick/Main'
import Product from '../page/pagePublick/Product'

import {
    MAIN_ROUTE, 
    ADMIN_ROUTE,
    PRODUCT_ROUTE,
    ADMIN_PRODUCT_ROUTE,
    ADMIN_PROMOTION_ROUTE,
} from './path'


export const publicRoutes = [
    {
        path: MAIN_ROUTE,
        Component: Main
    },
    {
        path: PRODUCT_ROUTE,
        Component: Product
    },
]

export const privateRoutes =[
    {
        path: ADMIN_ROUTE,
        Component: Admin
    },
    {
        path: ADMIN_PRODUCT_ROUTE,
        Component: ProductAdmin
    },
    {
        path: ADMIN_PROMOTION_ROUTE,
        Component: PromotionAdmin
    }
]