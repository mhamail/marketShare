import React, { useEffect } from 'react'
//antd style
import { Pagination } from 'antd';
import SkeletonCard from '../materialComponents/SkeletonCard';
import styled from '@emotion/styled';
//redux
import { useSelector, useDispatch } from 'react-redux'
import { STATUSES } from '../../redux/slices/productSlice'
import { selectSortPrice, selectSearch, selectPrice } from '../../redux/slices/product/filterProduct/productFilterSelector'
//function
import { totalProductsCount, handlePagination, searchFilterProduct } from './function';
//component
import ProductCard from './components/ProductCard';

const ShowProducts = () => {
    const theme = useSelector(state => state.theme.themeMode)
    const products = useSelector((state) => state.product.data)
    const productsCount = useSelector((state) => state.product.count)
    const status = useSelector((state) => state.product.status);
    const search = useSelector(selectSearch)
    const price = useSelector(selectPrice)
    const sortPrice = useSelector(selectSortPrice)
    const dispatch = useDispatch()

    useEffect(() => {
        totalProductsCount(dispatch)
    }, [])

    useEffect(() => {
        search && searchFilterProduct(dispatch, search)
    }, [search])

    if (status === STATUSES.ERROR) {
        return <h2>Something went wrong!</h2>;
    }

    const productPagination = {
        boxShadow: `0px 0px 20px ${theme.text}`,
        padding: "10px",
        borderRadius: "10px"
    }

    // main body
    return (
        <>
            {
                status !== STATUSES.IDLE ?
                    <SkeletonCard count="12" column={3} /> :
                    products.map((product) => {
                        return <div className="col-lg-3 col-6" key={product._id}>
                            <ProductCard product={product} />
                        </div>
                    })}
            <div className="d-flex justify-content-center" style={productPagination}>
                <Pagination
                    defaultCurrent={1}
                    total={Math.floor((productsCount / 12) * 10)}
                    onChange={handlePagination(dispatch, price, search, sortPrice)}
                />
            </div>
        </>
    )

}

export default ShowProducts