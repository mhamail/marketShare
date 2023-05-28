import React from 'react'
import Layout from '../../component/Layout'
import Private from '../../component/auth/Private'
import SideDrawer from '../../component/user/component/SideDrawer'
import ProfileComponent from '../../component/user/ProfileComponent'
import UserDispatch from '../../component/dispatchMiddleware/UserDispatch'

const User = () => {
  return (
    //this page required dashboard
    <Layout>
      <Private>
        <UserDispatch>
          <div>
            <div className="container-fluid">
              <div className="row">

                <div className="col-lg-3 ">
                  <SideDrawer />
                </div>
                <div className="col-lg-9">
                  <div className="col-lg-12 pt-3 pb-2">
                    <h4>My Profile</h4>
                  </div>
                  <ProfileComponent />
                </div>
              </div>
            </div>
          </div>
        </UserDispatch>
      </Private>
    </Layout>
  )
}

export default User