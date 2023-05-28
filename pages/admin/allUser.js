import React from 'react'
import Layout from '../../component/Layout'
import Admin from '../../component/auth/Admin'
import SideDrawer from '../../component/admin/components/SideDrawer'
import AllUserComponent from '../../component/admin/userList/AllUserComponent'
import AllUserDispatch from '../../component/dispatchMiddleware/AllUserDispatch'

const AllUsers = () => {
    return (
        <div>
            <Layout>
                <Admin>
                    <AllUserDispatch>
                        <div className="container-fluid">
                            <div className="row">
                                <div className='col-lg-12'>
                                    <div className="row">
                                        <div className="col-lg-3">
                                            <SideDrawer />
                                        </div>

                                        <div className="col-lg-9">
                                            <div className="col-lg-12 pt-3 pb-3">
                                                <h3 className='bg-secondary'>Manage Users</h3>
                                            </div>
                                            <AllUserComponent />
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </AllUserDispatch>
                </Admin>
            </Layout>
        </div>
    )
}

export default AllUsers