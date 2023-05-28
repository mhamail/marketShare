import { createSlice } from "@reduxjs/toolkit";
import { Add_Item,SetItemQuantity,delete_Item } from "./cartUtils";

const cartSlice = createSlice({
    name : 'cart',
    initialState:{
        cartItem:[],
    },
    reducers:{
        addCartItem:(state,action)=>{
            state.cartItem=Add_Item(state.cartItem,action.payload)
        },
        deleteCartItem:(state,action)=>{
            state.cartItem=delete_Item(state.cartItem,action.payload)
        },
        increaseItemQuantity:(state,action)=>{
            state.cartItem=SetItemQuantity(state.cartItem,action.payload)
        },
        deleteCart:(state,action)=>{
            state.cartItem=[]
        }
    },
})

export const {addCartItem,increaseItemQuantity,deleteCartItem,deleteCart} = cartSlice.actions;

export default cartSlice.reducer