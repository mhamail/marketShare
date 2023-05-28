import React from 'react'
//style
import { CloseCircleOutlined } from '@ant-design/icons';
import styles from './cart.module.scss'
import styled from '@emotion/styled';
//routing
import Link from 'next/link'
//redux
import { useDispatch, useSelector } from 'react-redux'
import { increaseItemQuantity, deleteCartItem } from '../../redux/slices/cart/cartSlice'

const CartItems = ({ product, index, cartItems }) => {
    const { _id, title, slug, images, count, price, } = product
    const dispatch = useDispatch()

    const handleQuantityChange = (event) => {
        const { value } = event.target

        cartItems.map((item) => {
            if (item._id === product._id) {
                if (value == 0) {
                    dispatch(deleteCartItem(item))
                }
                else {
                    let itemUpdate = { ...item, count: Number(value) }
                    dispatch(increaseItemQuantity(itemUpdate))
                }
            }
        })
    }
    const Screenlg = styled.span`
        @media screen and (max-width: 600px) {
            display:none
        }
        `
    const Screensm = styled.span`
        display:none;
        @media screen and (max-width: 600px) {
            display:block;
        }
        `
    return (
        <tr key={_id} className="bg-light" style={{ width: "100%" }}>
            <td className='text-center' style={{ width: "10%" }}>
                <CloseCircleOutlined
                    className={styles.closeCircleIcon}
                    onClick={() => dispatch(deleteCartItem(product))}
                />
            </td>
            <Link href={`/shop/${slug}`} style={{ width: "20%" }}>
                <td className="text-center">
                    <a href={`/shop/${slug}`}>
                        <img
                            style={{ width: "100%", cursor: "pointer" }}
                            src={images[0]}
                            alt={title}
                        />
                    </a>
                </td>
            </Link>
            <td className="text-center" style={{ width: "70%" }}>
                <div style={{ fontStyle: "italic", fontWeight: "600" }}>
                    <Screenlg>{title.substring(0, 50)}...</Screenlg>
                    <Screensm>{title.substring(0, 15)}...</Screensm>
                </div>
                <div>
                    price: <span style={{ fontWeight: "700" }}>{price}.00rs</span>
                </div>
                <div className='d-flex justify-content-center'>
                    quantity: &nbsp;
                    <input
                        style={{ fontWeight: "700" }}
                        type="number"
                        // className="form-control"
                        defaultValue={count}
                        min="1"
                        max="9"
                        size="1"
                        maxlength="1"
                        onChange={handleQuantityChange}
                    />
                </div>

            </td>
        </tr>
    )
}

export default CartItems