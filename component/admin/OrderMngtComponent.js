import React from 'react'
import Link from 'next/link'
import { updateOrderStatus } from '../../actions/order'
import { useDispatch } from 'react-redux'
import { getCookie } from '../../actions/auth'

const OrderMngtComponent = ({ allOrder, fetch }) => {
    const dispatch = useDispatch()
    const token = getCookie('token')

    const handleOrderStatus = order => (event) => {
        let status = event.target.value;
        updateOrderStatus(order._id, status, token)
            .then(res => {
                dispatch(fetch())
            })
            .catch(err => console.log(err))
    }

    const thead = () => {
        return <tr>
            <th className="text-center" >
            </th>
            <th className="text-center">Image</th>
            <th className="text-center">Name</th>
            <th className="text-center">Price</th>
            <th className="text-center">Count</th>
        </tr>
    }
    const tbody = (order) => {
        return order.products.map((order, index) => {
            return <tr key={order._id}>
                <th className="text-center">
                    &nbsp;{index + 1}
                </th>
                {order.product ?
                    <Link href={`/shop/${order.product.slug}`}>
                        <td>
                            <a href="">
                                <img
                                    style={{ width: "30px", cursor: "pointer" }}
                                    src={order.product.images[0]}
                                    alt={order.title}
                                />
                            </a>
                        </td>
                    </Link>
                    :
                    <img src="" />
                }
                <td>{order.title.substring(0, 20)}...</td>
                <td>
                    {order.price}.00
                </td>
                <td>{order.count}</td>
            </tr>
        })
    }

    const showOrderInTable = (order) => {
        return <table className={`table table-striped mt-2 table-sm`}>
            <thead className="bg-dark text-light">
                {thead()}
            </thead>
            <tbody>
                {order && tbody(order)}
            </tbody>
        </table>
    }

    const showEachOrder = () => {
        return allOrder.map((order, index) => {
            return <div className={`m-2 p-3 card`}
                key={order._id}>
                <div className={`d-flex justify-content-between
                ${order.orderStatus === "Completed" ? "bg-success":
                order.orderStatus === "Cancelled" && "bg-danger"
                }
                `}>
                    <p>{`order #: ${index + 1}`}</p>
                    <div className="form-group">
                        <select
                            className="form-select"
                            value={order.orderStatus}
                            onChange={handleOrderStatus(order)}
                        >
                            <option value="" selected>Select</option>
                            <option>Not Processed</option>
                            <option>Cash on Delivery</option>
                            <option>Cancelled</option>
                            <option>Completed</option>
                        </select>
                    </div>
                    <p className='fw-bold fw-1'>Total Amount {order.paymentIntent.amount}.00</p>
                </div>
                {showOrderInTable(order)}
                <p>Address:{order.userDetail.address} {"\n"} </p>
                <p>phone:{order.userDetail.phone} {" "} name:{order.userDetail.name}</p>
            </div>
        })
    }
    return (
        <div>
            {allOrder && allOrder.length > 0 ?
                showEachOrder()
                :
                <h4>
                    No Orders
                </h4>
            }




        </div>
    )
}

export default OrderMngtComponent