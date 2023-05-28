import React from 'react'
import Layout from '../../component/Layout'
import Private from '../../component/auth/Private'
import SideDrawer from '../../component/user/component/SideDrawer'
import WishlistComponent from '../../component/user/WishlistComponent'
import WishlistDispatch from '../../component/dispatchMiddleware/WishlistDispatch'

const Wishlist = () => {
    return (
        <Layout>
            <Private>
                <WishlistDispatch>
                <div>
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-lg-3 ">
                                <SideDrawer />
                            </div>
                            <div className="col-lg-9 mt-2">
                                <WishlistComponent />
                            </div>
                        </div>
                    </div>
                </div>
                </WishlistDispatch>
            </Private>
        </Layout>

    )
}

export default Wishlist