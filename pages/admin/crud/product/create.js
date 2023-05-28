import React from 'react'
import Layout from '../../../../component/Layout'
import Admin from '../../../../component/auth/Admin'
import SideDrawer from '../../../../component/admin/components/SideDrawer'
import CreateProduct from '../../../../component/admin/CrudComponent/product/CreateProduct'
import CategoriesDispatch from '../../../../component/dispatchMiddleware/CategoriesDispatch'

const ProductCreate = () => {
    return (
        <Layout>
            <Admin>
                <CategoriesDispatch>
                    <div className="container-fluid">
                        <div className="row">
                            <div className='col-lg-12'>
                                <div className="row">
                                    <div className="col-lg-3">
                                        <SideDrawer />
                                    </div>
                                    <div className="col-lg-9">
                                        <div className="col-lg-12 pt-3 pb-3">
                                            <h3 className='bg-secondary'>Create Product</h3>
                                        </div>
                                        <CreateProduct />
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

export default ProductCreate