import { createSelector } from "reselect";

const selectCart = state=>state.cart

export const selectCartItems = createSelector(
    selectCart,
    cart=>cart.cartItem
)

export const selectCartTotal=createSelector(
    selectCartItems,
    cartItem=>cartItem.reduce((accum,item)=>
        accum+item.count*item.price,0
    )
)