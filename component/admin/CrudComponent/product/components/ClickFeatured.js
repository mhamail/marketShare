import React from 'react'
import { StarOutlined, StarFilled } from '@ant-design/icons';
//redux
import { useDispatch } from 'react-redux';
import { fetchProduct } from '../../../../../redux/slices/productSlice';
import { fetchListByUser } from '../../../../../redux/slices/product/listByUserSlice';
//action
import { featuredProduct } from '../../../../../actions/product';
import { isAuth } from '../../../../../actions/auth';

const ClickFeatured = ({ product }) => {
    const userId = isAuth() && isAuth()._id
    const { featured } = product;
    const dispatch = useDispatch()
    const clicktoFeatured = (featured) => {
        featuredProduct(product._id, featured)
            .then(res => {
                dispatch(fetchListByUser({ userId }))
            })
            .catch(err => console.log(err))
    }
    return (
        <div style={{ cursor: "pointer" }}>
            {!featured ?
                <div onClick={() => clicktoFeatured(true)}>
                    <StarOutlined style={{ fontSize: "1.4em" }} />
                </div>
                :
                <div onClick={() => clicktoFeatured(false)}>
                    <StarFilled style={{ fontSize: "1.4em" }} />
                </div>
            }
        </div>
    )
}

export default ClickFeatured