import React from 'react'
import Layout from '../../../../component/Layout'
import Admin from '../../../../component/auth/Admin'
import SideDrawer from '../../../../component/admin/components/SideDrawer'
import ListInactive from '../../../../component/admin/CrudComponent/product/listProduct/ListInactive'
import InactiveProductDispatch from '../../../../component/dispatchMiddleware/InactiveProductDispatch'

const InactiveList = () => {
    return (
        <Layout>
            <Admin>
                <InactiveProductDispatch>
                    <div>
                        <div>
                            <div className="d-flex">
                                <div style={{ width: "300px", position: "fixed", }}>
                                    <SideDrawer />
                                </div>
                                <div className="p-5 pt-0"
                                    style={{ marginLeft: "300px", background: "white", zIndex: "3" }}>
                                    <div className="pt-3 pb-3">
                                        <h3 className='bg-secondary'>Inactive Products</h3>
                                    </div>
                                    <ListInactive />
                                </div>
                            </div>

                        </div>
                    </div>
                </InactiveProductDispatch>
            </Admin>
        </Layout>
    )
}

export default InactiveList