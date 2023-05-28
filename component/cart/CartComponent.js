import React, { useState, useEffect } from 'react'
//style
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import styled from '@emotion/styled'
//routing
import Link from 'next/link'
import { withRouter } from 'next/router'
//redux
import { useSelector } from 'react-redux'
import { selectCartItems, selectCartTotal } from '../../redux/slices/cart/cartSelector'
//components
import CartItems from './CartItems'
import OrderDirectly from './OrderDirectly'
//action
import { isAuth, getCookie } from '../../actions/auth'
import { userCart } from '../../actions/user'

const CartComponent = ({ router }) => {
    const theme = useSelector(state => state.theme.themeMode)
    const cartItems = useSelector(selectCartItems)
    const cartTotal = useSelector(selectCartTotal)
    let [formData, setFormData] = useState();
    const [toggleOrder, setToggleOrder] = useState(false);

    const token = getCookie('token')

    useEffect(() => {
        setFormData(new FormData())
    }, [cartItems])

    //function
    const intendedRouting = () => {
        router.push({
            pathname: "/auth/signin",
            query: { from: `/cart` }
        })
    }

    const saveOrderToDb = () => {
        formData.set("cart", JSON.stringify(cartItems))
        userCart(formData, token)
            .then(res => {
                if (res.data.ok) {
                    router.push("/checkout")
                }
            })
            .catch(err => toast.error(err.response.data.error)
            )
    }

    let calculateShippingPrice = cartTotal > 4999 ? 0 : 200 
    const shippingPrice = () => 
             cartTotal > 4999 ? "Free Shipping" : `${calculateShippingPrice}.00 Rs`
    

    //component function
    const thead = () => {
        return <tr>
            <th className="text-center">Total {cartItems.length}</th>
            <th className="text-center">Image</th>
            <th className="text-center">Detail</th>
        </tr>
    }

    const tbody = () => {
        return cartItems.map((item, index) => {
            return (
                <CartItems
                    key={item._id}
                    product={item}
                    index={index}
                    cartItems={cartItems}
                />
            )
        })
    }
    // styled
    const MethodOrder = styled.div`
        cursor:pointer;
         :hover{
        opacity:0.8 ;
    }
    `


    return (
        <div className='container'>
            <ToastContainer />
            {cartItems.length === 0 ?
                <p>
                    No Products in cart.
                    {" "}
                    <Link href="/shop"><a>Continue Shopping</a></Link>
                </p>
                :
                <div className="row">
                    {/* col-8 */}
                    <div className="col-lg-8 col-12">
                        <table className={`table table-sm table-striped mt-2`}>
                            <thead className="bg-dark text-light">
                                {thead()}
                            </thead>
                            <tbody>
                                {tbody()}
                            </tbody>

                        </table>
                    </div>
                    {/* col-4 */}
                    <div className="col-lg-4 col-12">
                        <div>
                            <div className='d-flex justify-content-between'>
                                <h4 className='fw-bold'>Order Summary</h4>
                                <p className='fw-bold'>cash on delivery</p>
                            </div>
                            <hr />
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
                        {!toggleOrder ?
                            <>
                                {isAuth() ?
                                    <div className='d-flex justify-content-between mt-2'>
                                        <button className="btn btn-sm btn-dark" onClick={saveOrderToDb}>Proceed to Checkout</button>
                                        <button className='btn btn-sm btn-dark'>edit address</button>
                                    </div>
                                    :
                                    <div className='d-flex justify-content-between mt-2'>
                                        <button className="btn btn-sm btn-dark" onClick={intendedRouting}>Login to Checkout</button>
                                        <button className='btn btn-sm btn-dark disabled'>edit address</button>
                                    </div>
                                }
                                <div className='mt-2 d-flex'>
                                    <p>or</p>
                                    <MethodOrder className='fw-bold ms-2'
                                        onClick={() => setToggleOrder(true)}
                                    >
                                        Order Directly without login
                                    </MethodOrder>

                                </div>
                            </>
                            :
                            <div>
                                <OrderDirectly
                                    formData={formData}
                                    cartItems={cartItems}
                                />

                                <div className='d-flex'>
                                    <p>or</p>
                                    <MethodOrder className='fw-bold ms-2'
                                        onClick={() => setToggleOrder(false)}
                                    >
                                        Order with login
                                    </MethodOrder>

                                </div>
                            </div>
                        }
                    </div>

                </div>
            }
        </div>
    )
}

export default withRouter(CartComponent)