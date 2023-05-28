import React from 'react'
import Layout from '../../../../component/Layout'
import Admin from '../../../../component/auth/Admin'
import SideDrawer from '../../../../component/admin/components/SideDrawer'
import ListProduct from '../../../../component/admin/CrudComponent/product/listProduct/ListProduct'
import ListByUserDispatch from '../../../../component/dispatchMiddleware/ListByUserDispatch'

const ProductList = () => {
    return (
        <Layout>
            <Admin>
                <ListByUserDispatch>
                    <div>
                        <div>
                            <div className="d-flex">
                                <div style={{ width: "400px",}}>
                                    <SideDrawer />
                                </div>
                                <div className="p-5 pt-0 mt-3"
                                    style={{ background: "white", width:"100%" }}>
                                    <div className="pt-3 pb-3">
                                        <h3 className='bg-secondary'>Products</h3>
                                    </div>
                                    <ListProduct />
                                </div>
                            </div>

                        </div>
                    </div>
                </ListByUserDispatch>
            </Admin>
        </Layout>
    )
}

export default ProductList