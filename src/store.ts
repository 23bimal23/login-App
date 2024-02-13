import { configureStore } from "@reduxjs/toolkit";
import ShoppingCartReducer from "./slices/ShoppingCartSlice"

export const store = configureStore({
    reducer:{
        ShoppingCart : ShoppingCartReducer,
    }
})
export type RootState =  ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
