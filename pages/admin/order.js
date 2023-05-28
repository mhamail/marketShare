import React from 'react'
import Layout from '../../component/Layout'
import AdminOrderDispatch from '../../component/dispatchMiddleware/AdminOrderDispatch'
import Admin from '../../component/auth/Admin'
import SideDrawer from '../../component/admin/components/SideDrawer'
import OrderMngtComponent from '../../component/admin/OrderMngtComponent'
//action
import { isAuth } from '../../actions/auth'
//redux
import { useSelector } from 'react-redux'
import { fetchAllOrder } from '../../redux/slices/order/adminOrderSlice'
import { fetchVendorOrder } from '../../redux/slices/order/vendorOrderSlice'

const OrderManagement = () => {
    const allOrder = useSelector(state => state.adminOrder.data)
    const vendorOrder = useSelector((state) => state.vendorOrder.data)
    return (
        <Layout>
            <Admin>
                <AdminOrderDispatch>
                    <div className="container-fluid">
                        <div className="row">
                            <div className='col-lg-12'>
                                <div className="row">
                                    <div className="col-lg-3">
                                        <SideDrawer />
                                    </div>

                                    <div className="col-lg-9">
                                        <div className="col-lg-12 pt-3 pb-3">
                                            <h3 className='bg-secondary'>Manage Orders</h3>
                                        </div>
                                        {isAuth && isAuth().username === "hashir" ?
                                            <OrderMngtComponent
                                                allOrder={allOrder}
                                                fetch={fetchAllOrder}
                                            />
                                            :
                                            <OrderMngtComponent
                                                allOrder={vendorOrder}
                                                fetch={fetchVendorOrder}
                                            />
                                        }
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </AdminOrderDispatch>
            </Admin>
        </Layout>
    )
}

export default OrderManagement