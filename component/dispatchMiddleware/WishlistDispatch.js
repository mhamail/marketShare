import { fetchWishlist } from '../../redux/slices/user/wishlistSlice'
import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

const WishlistDispatch = ({ children }) => {
    const dispatch = useDispatch()

    const mywishlist = useSelector((state) => state.mywishlist.data)

    useEffect(() => {
        mywishlist.length < 1 && dispatch(fetchWishlist())
    }, [])
    return (
        <>
            {children}
        </>
    )
}

export default WishlistDispatch