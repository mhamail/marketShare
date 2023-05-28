import React from 'react'
import Layout from '../../../component/Layout'
import Admin from '../../../component/auth/Admin'
import CategoryComponent from '../../../component/admin/CrudComponent/category/CategoryComponent'
import SideDrawer from '../../../component/admin/components/SideDrawer'
import CategoriesDispatch from '../../../component/dispatchMiddleware/CategoriesDispatch'
import { isAuth } from '../../../actions/auth'
const Category = () => {
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
                                            <h3 className='bg-secondary'>Manage Categories</h3>
                                        </div>
                                        {isAuth() && isAuth().username === "hashir"?
                                            <CategoryComponent />
                                            :
                                            <h5>You have no access of this panel</h5>
                                        }
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

export default Category