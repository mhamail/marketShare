import React from 'react'
import Link from 'next/link'
import { useSelector } from 'react-redux'
// import dynamic from 'next/dynamic';
// const PdfView = dynamic(() => import('./PdfView'), { ssr: false })
import PdfView from './PdfView'

const OrderListComponent = () => {
    const userOrder = useSelector(state => state.userOrder.data)

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
                            <a>
                                <img
                                    style={{ width: "50px", cursor: "pointer" }}
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
                {order.products && tbody(order)}
            </tbody>
        </table>
    }
    const showDownloadLink = (order) => (
        <PdfView order={order} />
    )
    const showEachOrder = () => {
        return userOrder.map((order, index) => {
            return <div
                className="m-5 p-3 card"
                key={order._id}>
                <div className='d-flex justify-content-between'>
                    <p>{`order #: ${index + 1}`}</p>
                    <p
                        className={`fw-bold text-light 
                    ${order.orderStatus === "Completed" ? "bg-success" : "bg-dark"}`
                        }>
                        status: {order.orderStatus}
                    </p>
                    <p>Total Amount {order.paymentIntent.amount}.00</p>
                </div>
                {showOrderInTable(order)}
                <div className="row">
                    <div className="col">
                        {order.products && showDownloadLink(order)}
                    </div>
                </div>
            </div>
        })
    }
    return (
        <div>
            <h4>
                {userOrder.length > 0 ? "User Purchased Orders" : "No Purchased Orders"}
            </h4>
            {showEachOrder()}

        </div>
    )
}

export default OrderListComponent