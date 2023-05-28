import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import categoryReducer from './slices/categorySlice'
import subcategoryReducer from './slices/subcategorySlice'
import productReducer from './slices/productSlice'
import featuredReducer from './slices/product/featured'
import listByUserReducer from './slices/product/listByUserSlice'
import filterReducer from './slices/product/filterProduct/filterSlice'
import inactiveProductReduer from './slices/product/inactiveProductSlice'
import cartReducer from "./slices/cart/cartSlice";
import userReducer from './slices/user/userSlice'
import allUserReducer from './slices/user/allUserSlice'
import wishlistReducer from './slices/user/wishlistSlice'
import userOrderReducer from './slices/order/userOrderSlice'
import adminOrderReducer from './slices/order/adminOrderSlice'
import vendorOrderReducer from './slices/order/vendorOrderSlice'
import themeReducer from './slices/theme/theme'

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['cart']
}
const rootReducer = combineReducers({
    theme: themeReducer,
    category: categoryReducer,
    subcategory: subcategoryReducer,
    product: productReducer,
    inactiveProduct: inactiveProductReduer,
    filter: filterReducer,
    listByUser: listByUserReducer,
    cart: cartReducer,
    user: userReducer,
    allUser: allUserReducer,
    mywishlist: wishlistReducer,
    userOrder: userOrderReducer,
    adminOrder: adminOrderReducer,
    vendorOrder: vendorOrderReducer,
    featured: featuredReducer
});

export default persistReducer(persistConfig, rootReducer)