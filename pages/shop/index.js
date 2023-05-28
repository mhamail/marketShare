import React, { useState } from 'react'
import Layout from '../../component/Layout'
import ShowProducts from '../../component/shop/ShowProducts'
import SidePanel from '../../component/shop/SidePanel'
import ProductDispatch from '../../component/dispatchMiddleware/ProductDispatch'
import CategoriesDispatch from '../../component/dispatchMiddleware/CategoriesDispatch'
import SelectLowHighPrice from '../../component/shop/components/SelectLowHighPrice'
import BreadCrumb from '../../component/materialComponents/BreadCrumb'
import { MenuOutlined } from '@ant-design/icons'
import { useSelector } from 'react-redux'

const ShopIndex = () => {
  const theme = useSelector(state => state.theme.themeMode)
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  return (
    <div style={{ backgroundColor: theme.primary }}>
      <Layout>
        <ProductDispatch>
          <CategoriesDispatch>
            <div className='container-fluid'>
              <div className='row justify-content-between'>
                <div className="col-lg-3 p-3" style={{zIndex:"4"}}>
                  <div className='menuIcon' onClick={toggle}>
                    <MenuOutlined style={{ color: theme.active }} />
                  </div>
                  <div className={isOpen ? "sidePanel" : "sidePanelDisplay"}>
                    <SidePanel />
                  </div>
                </div>
                <div className="col-lg-9 mt-lg-5">
                  <div className="row">
                    <div className='ps-5 pb-3 d-flex justify-content-between'>
                      <div className='text-muted'>
                     <BreadCrumb name1={"shop"} href1="shop" />
                      </div>
                      <div className=" mb-3">
                        <SelectLowHighPrice />
                      </div>
                    </div>
                    <ShowProducts/>
                  </div>
                </div>
              </div>
            </div>
          </CategoriesDispatch>
        </ProductDispatch>
      </Layout>
    </div >
  )
}

export default ShopIndex