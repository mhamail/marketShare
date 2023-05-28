import React, { useState } from 'react'
// style
import styles from '../product.module.scss'
import { ToastContainer, toast } from 'react-toastify'
import { Pagination } from 'antd';
import 'react-toastify/dist/ReactToastify.css'
//action
import { isAuth } from '../../../../../actions/auth';
//redux
import { useSelector, useDispatch } from 'react-redux'
import { fetchInactiveProduct } from '../../../../../redux/slices/product/inactiveProductSlice';
//function
import { delInactive,active } from './function';

const ListInactive = () => {
    const dispatch = useDispatch()
    const products = useSelector((state) => state.inactiveProduct.data)
    const productsCount = useSelector((state) => state.inactiveProduct.count)

    const userId = isAuth() && isAuth()._id

    const [checkProduct, setCheckProduct] = useState([])

    const handleProduct = (id) => () => {
        const clicked = checkProduct.indexOf(id)
        const all = [...checkProduct]
        if (clicked === -1) {
            all.push(id)
        } else {
            all.splice(clicked, 1)
        }
        setCheckProduct(all)
    }
    
    const handlePagination = (page) => {
        dispatch(fetchInactiveProduct({ userId, limit: 10, page }))
    }

    // main body
    const header = () => {
        return checkProduct.length > 0 &&
            <div className='d-flex'>
                <button
                    className='btn btn-sm btn-warning me-2'
                    onClick={()=>active(checkProduct,dispatch)}
                >
                    Active
                </button>
                <button
                    className='btn btn-sm btn-danger me-2'
                    onClick={()=>delInactive(checkProduct,dispatch)}
                >
                    Del
                </button>
            </div>
    }

    const thead = () => {
        return <tr>
            <th className="text-center" >
            </th>
            <th className="text-center">Image</th>
            <th className="text-center">Name</th>
            <th className="text-center">Price</th>
            <th className="text-center">Shipping</th>
        </tr>
    }

    const tbody = () => {
        return products && products.length ? products.map((product, index) => {
            const { title, slug, images, price,
                shipping, color, brand } = product
            return <tr>
                {/*checkbox */}
                <th className="text-center">
                    <input
                        className='ms-3'
                        type="checkbox"
                        onChange={handleProduct(product._id)}
                        checked={checkProduct.includes(product._id)}
                    />
                    &nbsp;.{index + 1}
                </th>
                <td>
                    <a>
                        <img
                            style={{ width: "100px", cursor: "pointer" }}
                            src={images[0]}
                            alt={title}
                        />
                    </a>
                </td>
                <td>{title.substring(0, 20)}...</td>
                <td>
                    {price}
                </td>
                <td>
                    {shipping}
                </td>
            </tr>
        })
            :
            <h5>No Inactive Product</h5>
    }


    return (
        <div>
            <ToastContainer />
            {header()}
            <table className={`table table-striped mt-2 ${styles.listProduct}`}>
                <thead className="bg-dark text-light">
                    {thead()}
                </thead>
                <tbody>
                    {tbody()}
                </tbody>
            </table>
            {productsCount &&
                <div className="d-flex justify-content-center">
                    <Pagination
                        defaultCurrent={1}
                        total={Math.floor((productsCount / 10) * 10)}
                        onChange={handlePagination}
                    />
                </div>
            }
        </div>
    )
}

export default ListInactive