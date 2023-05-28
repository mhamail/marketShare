import React from 'react'
import Layout from '../../../../component/Layout'
import Admin from '../../../../component/auth/Admin'
import SideDrawer from '../../../../component/admin/components/SideDrawer'
import EditProduct from '../../../../component/admin/CrudComponent/product/EditProduct'
import CategoriesDispatch from '../../../../component/dispatchMiddleware/CategoriesDispatch'

const ProductEdit = () => {
    return (
        <Layout>
            <Admin>
                <CategoriesDispatch>
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-lg-12 pt-3 ">
                                    <h2>Edit Product</h2>
                                </div>
                                <div className='col-lg-12'>
                                    <div className="row">
                                        <div className="col-lg-3">
                                            <SideDrawer />
                                        </div>
                                        <div className="col-lg-9">
                                            <EditProduct />
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                </CategoriesDispatch>
            </Admin>
        </Layout>
    )
}

export default ProductEdit