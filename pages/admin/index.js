import React, { useEffect } from 'react'

import Layout from '../../component/Layout'
import Admin from '../../component/auth/Admin'
import CardDashboard from '../../component/admin/CardDashboard';
import SideDrawer from '../../component/admin/components/SideDrawer';
import AdminDashboardDispatch from '../../component/dispatchMiddleware/AdminDashboardDispatch';
import ProductDispatch from '../../component/dispatchMiddleware/ProductDispatch';

export const config = {
  unstable_runtimeJS: false
}

const AdminIndex = () => {

  return (
    <Layout>
      <Admin>
        <AdminDashboardDispatch>
          <ProductDispatch>
            <div className="container-fluid">
              <div className="row">
                <div className="col-lg-3 ">
                  <SideDrawer />
                </div>

                <div className="col-lg-9 mt-3">
                  <CardDashboard />
                  {/* Favourite product */}
                </div>
              </div>
            </div>
          </ProductDispatch>
        </AdminDashboardDispatch>
      </Admin>
    </Layout>
  )
}

export default AdminIndex