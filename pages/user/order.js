import React from 'react'
import Layout from '../../component/Layout'
import Private from '../../component/auth/Private'
import UserOrderDispatch from '../../component/dispatchMiddleware/userOrderDispatch'
import SideDrawer from '../../component/user/component/SideDrawer'
// import OrderListComponent from '../../component/user/order/OrderListComponent'
import dynamic from 'next/dynamic';
import { Suspense } from 'react'
const OrderList = dynamic(() => import('../../component/user/order/OrderListComponent'), { suspense: true })

const Order = () => {
    return (
        <Layout>
            <Private>
                <UserOrderDispatch>
                    <div>
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-lg-3 ">
                                    <SideDrawer />
                                </div>

                                <div className="col-lg-9 mt-2">
                                    <Suspense fallback={`Loading...`}>
                                        <OrderList />
                                    </Suspense>
                                </div>
                            </div>
                        </div>
                    </div>
                </UserOrderDispatch>
            </Private>
        </Layout>

    )
}

export default Order