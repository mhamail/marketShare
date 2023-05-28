import React, { useState, useEffect } from 'react'
import Layout from '../../component/Layout'
import { withRouter } from 'next/router'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
//redux
import UserDispatch from '../../component/dispatchMiddleware/UserDispatch'
import { useSelector, useDispatch } from 'react-redux'
import { selectCartItems } from '../../redux/slices/cart/cartSelector'
import { deleteCart } from '../../redux/slices/cart/cartSlice'
import { fetchUserOrder } from '../../redux/slices/order/userOrderSlice'
//action
import { readCart } from '../../actions/user'
import { createCodOrder } from '../../actions/order'
import { getCookie, isAuth } from '../../actions/auth'
//materialComponents
import EditAddress from '../../component/materialComponents/EditAddress'

const Checkout = ({ router }) => {
    const theme = useSelector(state => state.theme.themeMode)
    const user = useSelector(state => state.user.data)
    const cartItems = useSelector(selectCartItems)
    const [values, setValues] = useState([])

    const { products, cartTotal } = values

    const token = getCookie('token');
    const dispatch = useDispatch();

    useEffect(() => {
        cartItems && cartItems.length > 0 && (
            readCart(token)
                .then(res => setValues(res.data))
                .catch(err => toast.error(err.response.data.error))
        )
    }, [])

    let count = 0
    if (products && products.length > 0) {
        for (let i = 0; i < products.length; i++) {
            count += products[i].count
        }
    }

    let calculateShippingPrice = cartTotal > 4999 ? 0 : 200 
    const shippingPrice = () => 
             cartTotal > 4999 ? "Free Shipping" : `${calculateShippingPrice}.00 Rs`

    const placeOrder = () => {
        createCodOrder(token)
            .then(res => {
                dispatch(deleteCart())
                dispatch(fetchUserOrder())
                toast.success("Order Successfully Submitted")
                router.push('/user/order')
            })
            .catch(err => console.log(err))
    }

    const orderSummary = () => {
        return <div>
            <div>
                <h4>Order Summary</h4>
                <hr />
                <table className='table'>
                    <tbody className='table-secondary'>
                        <tr>
                            <th>Product Quantity</th>
                            <th>
                                {count}
                            </th>
                        </tr>

                    </tbody>
                </table>
                <table className='table'>
                    <thead className=' table-dark'>
                        <tr>
                            <th>Subtotal</th>
                            <th>{cartTotal}.00 Rs</th>
                        </tr>
                        <tr>
                            <th>Shipping</th>
                            <th>{shippingPrice()}</th>
                        </tr>
                    </thead>
                    <tbody className='table-info'>
                        <tr>
                            <th>Total</th>
                            <th>{cartTotal + calculateShippingPrice}.00 Rs</th>
                        </tr>
                    </tbody>
                </table>
            </div>
            {isAuth() &&
                <button 
                className="btn btn-sm btn-success" 
                disabled={!user.address && "disabled"} 
                onClick={placeOrder}
                >
                    Place Order
                </button>
            }
        </div>
    }
    return (
        <div style={{ backgroundColor: theme.primary }}>
            <Layout>
                <div style={{ backgroundColor: theme.primary,marginTop:"20px",paddingBottom:"30px" }}>
                    <ToastContainer />
                    {cartItems && cartItems.length > 0 &&
                        <UserDispatch>
                            <div className='container shadow'
                                style={{ backgroundColor: "white", padding: "20px", borderRadius: "10px" }}>
                                <div className="row pt-5">
                                    <div className="col-lg-6 mb-3">
                                        <EditAddress toast={toast}/>
                                    </div>
                                    <div className='col-lg-6'>
                                        {orderSummary()}
                                    </div>
                                </div>
                            </div>
                        </UserDispatch>
                    }
                </div>
            </Layout >
        </div>
    )
}

export default withRouter(Checkout)