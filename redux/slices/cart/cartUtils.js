export const Add_Item = (cartItem, payloadCartItem) => {

    const existingCartItem = cartItem.find((item) => {
        return item._id === payloadCartItem._id
    })
    if (existingCartItem) {
        return cartItem.map((item) => {
            return item._id === payloadCartItem._id ?
                { ...item, count: item.count + 1 }
                : item
        })
    }
    return [...cartItem, { ...payloadCartItem, count: 1 }]
}

export const SetItemQuantity = (cartItem, payloadCartItem) => {
        return cartItem.map((item) => {
            return item._id === payloadCartItem._id ?
                { ...item, count: payloadCartItem.count }
                : item
        })
}

export const delete_Item=(cartItem,payloadCartItem)=>{
    return cartItem.filter(item=>{
        return item._id!==payloadCartItem._id
    })
}

