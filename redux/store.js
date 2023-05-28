import { configureStore, applyMiddleware } from "@reduxjs/toolkit";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import rootReducer from "./root-reducer";
import { createWrapper } from 'next-redux-wrapper'
import {persistStore} from 'redux-persist'

// middleware
const middleware = [thunk];

export const store = configureStore({
    reducer: rootReducer,
},
    composeWithDevTools(applyMiddleware(...middleware))
)
export const persistor = persistStore(store)
const makeStore = () => store
export const wrapper = createWrapper(makeStore)