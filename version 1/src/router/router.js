
import Admin from '../page/pageAdmin/Admin'
import Main from '../page/pagePublick/Main'
import Product from '../page/pagePublick/Product'





import {
    MAIN_ROUTE, 
    ADMIN_ROUTE,
    PRODUCT_ROUTE,
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
]