import React from 'react'
import Link from 'next/link';
//action
import { getCookie, handleResponse } from '../../actions/auth'
import { removeWishlist } from '../../actions/user';
//redux
import { useSelector, useDispatch } from 'react-redux';
import { fetchWishlist } from '../../redux/slices/user/wishlistSlice';

const WishlistComponent = () => {
    const mywishlist = useSelector(state => state.mywishlist.data)
    const dispatch = useDispatch()
    const token = getCookie('token')

    const deleteWishlist = (productId) => {
        removeWishlist(productId, token)
            .then(res => {
                dispatch(fetchWishlist())
            })
            .catch(err => handleResponse(err))
    }

    const thead = () => {
        return <tr>
            <th className="text-center">Image</th>
            <th className="text-center">Name</th>
            <th className="text-center">Price</th>
            <th className="text-center"></th>
        </tr>
    }

    const tbody = () => {
        return mywishlist.map((list, index) => {
            const { images, slug, title, price } = list
            return <tr key={list._id}>
                <Link href={`/shop/${slug}`}>
                    <td className="text-center">
                        <a href="">
                            <img
                                style={{ width: "50px", cursor: "pointer" }}
                                src={images[0]}
                                alt={title}
                            />
                        </a>
                    </td>
                </Link>
                <td className="text-center">{title.substring(0, 20)}...</td>
                <td className="text-center">
                    {price}.00
                </td>
                <td className="text-center">
                    <button
                        className='btn btn-sm btn-danger'
                        onClick={() => deleteWishlist(list._id)}
                    >del</button>
                </td>
            </tr>
        })
    }

    const showWishlist = () => {
        return <table className={`table table-striped mt-2 table-sm`}>
            <thead className="bg-dark text-light">
                {thead()}
            </thead>
            <tbody>
                {tbody()}
            </tbody>
        </table>
    }

    return (
        <div>
            {showWishlist()}
        </div>
    )
}

export default WishlistComponent