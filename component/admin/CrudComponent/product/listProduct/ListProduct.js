import React, { useState } from 'react'
import Link from 'next/link';
//icon
import { EditFilled } from '@ant-design/icons';
// style
import styles from '../product.module.scss'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Pagination } from 'antd';
//redux
import { useSelector, useDispatch } from 'react-redux'
import { STATUSES } from '../../../../../redux/slices/productSlice';
import { fetchListByUser } from '../../../../../redux/slices/product/listByUserSlice';
//components
import EditPrice from '../components/EditPrice';
import ClickFeatured from '../components/ClickFeatured';
import { CircleLoading } from '../../../../materialComponents/CircleLoading';
import LowHighPriceFilter from '../../../../materialComponents/LowHighPriceFilter';
//function
import { inactive, del } from './function';
//action
import { isAuth } from '../../../../../actions/auth';

const ListProduct = () => {
    const [sortPrice, setSortPrice] = useState("")
    const dispatch = useDispatch()
    const productByUser = useSelector(state => state.listByUser.data)
    const productsCount = useSelector((state) => state.listByUser.count)
    const status = useSelector((state) => state.product.status);

    const userId = isAuth() && isAuth()._id
    const username = isAuth() && isAuth().username

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
        dispatch(fetchListByUser({ userId, limit: 10, page, sortPrice }))
    }
    // main body
    const header = () => {
        return <div className='d-flex justify-content-between' style={{ width: "100%" }}>
            {checkProduct.length > 0 &&
                <div className='d-flex'>
                    <button
                        className='btn btn-sm btn-warning me-2'
                        onClick={() => inactive(checkProduct, dispatch)}
                    >
                        Inactive
                    </button>
                    <button
                        className='btn btn-sm btn-danger me-2'
                        onClick={() => del(checkProduct, dispatch)}
                    >
                        Del
                    </button>
                </div>
            }
            <div style={{ marginLeft: "auto" }}>
                <LowHighPriceFilter
                    sortPrice={sortPrice}
                    setSortPrice={setSortPrice}
                    fetchListByUser={fetchListByUser}
                    userId={userId}
                />
            </div>
        </div>

    }

    const thead = () => {
        return <tr>
            {username === "hashir"?
                <th className="text-center" >Featured</th>
                : null}
            <th className="text-center" >
            </th>
            <th className="text-center">Image</th>
            <th className="text-center">Name</th>
            <th className="text-center">Price</th>
            <th className="text-center">Shipping</th>
        </tr>
    }
    const tbody = () => {
        return productByUser.map((product, index) => {
            const { _id, title, slug, images, price,
                shipping, color, brand } = product
            return <tr key={product._id}>
                {username === "hashir"?
                <td className='text-center'>
                    <ClickFeatured product={product} />
                </td>
                :""
                }
                {/* edit product & checkbox */}
                <th className="text-center">
                    <Link href={`/admin/crud/product/${slug}`}>
                        <a className={`${styles.edit}`}>
                            <EditFilled className={`me-2 ${styles.edit}`} />
                        </a>
                    </Link>
                    <input
                        className='ms-3'
                        type="checkbox"
                        onChange={handleProduct(product._id)}
                        checked={checkProduct.includes(product._id)}
                    />
                </th>
                {/* single product link */}
                <Link href={`/shop/${slug}`}>
                    <td>
                        <a href={`/shop/${slug}`}>
                            <img
                                style={{ width: "100px", cursor: "pointer" }}
                                src={images[0]}
                                alt={title}
                            />
                        </a>
                    </td>
                </Link>
                <td>{title.substring(0, 20)}...</td>
                <td>
                    <EditPrice
                        price={price}
                        _id={product._id}
                        slug={slug}
                    />
                </td>
                <td>
                    {shipping}
                </td>
            </tr>
        })
    }
    if (status === STATUSES.ERROR) {
        return <h2>Something went wrong!</h2>;
    }

    return (
        <div className='container'>
            <ToastContainer />
            {header()}
            {status !== STATUSES.IDLE ?
                <CircleLoading />
                :
                <table className={`table table-striped mt-2 ${styles.listProduct}`}>
                    <thead className="bg-dark text-light">
                        {thead()}
                    </thead>
                    <tbody>
                        {tbody()}
                    </tbody>
                </table>
            }
            <div className="d-flex justify-content-center">
                <Pagination
                    defaultCurrent={1}
                    total={Math.floor((productsCount / 10) * 10)}
                    onChange={handlePagination}
                />
            </div>
        </div>
    )
}

export default ListProduct