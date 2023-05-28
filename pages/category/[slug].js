import React, { useState } from 'react'
import { withRouter } from 'next/router';
//style
import { MenuOutlined } from '@ant-design/icons'
//component
import Layout from '../../component/Layout'
import ShowCatProducts from '../../component/categoryProduct/ShowCatProducts';
import SidePanel from '../../component/shop/SidePanel'
import SelectLowHighPrice from '../../component/shop/components/SelectLowHighPrice'
//material components
import BreadCrumb from '../../component/materialComponents/BreadCrumb'
//redux
import CategoriesDispatch from '../../component/dispatchMiddleware/CategoriesDispatch'
import { useSelector } from 'react-redux'

const Category = ({router}) => {
  const theme = useSelector(state => state.theme.themeMode)
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  return (
    <div style={{ backgroundColor: theme.primary }}>
      <Layout>
        <CategoriesDispatch>
          <div className='container-fluid'>
            <div className='row justify-content-between'>
              <div className="col-lg-3 p-3">
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
                      <BreadCrumb
                        name1={router.query.slug} href1={`category/${router.query.slug}`}
                      />
                    </div>
                    <div className=" mb-3">
                      <SelectLowHighPrice />
                    </div>
                  </div>
                  <ShowCatProducts/>
                </div>
              </div>
            </div>
          </div>
        </CategoriesDispatch>
      </Layout>
    </div >
  )
}

// Category.getInitialProps = async ({ query }) => {
//   return filterCategory(query.slug, 0)
//     .then(res => {
//       return {
//         products: res.data.products,
//         count: res.data.count,
//         query
//       }
//     }
//     )
//     .catch(err => console.log(err))
// };

export default withRouter(Category)