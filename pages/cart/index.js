import React from 'react'
import styled from '@emotion/styled'
import Layout from '../../component/Layout'
import BreadCrumb from '../../component/materialComponents/BreadCrumb'
import CartComponent from '../../component/cart/CartComponent'
import { useSelector} from 'react-redux'

const CartIndex = () => {
  const theme = useSelector(state => state.theme.themeMode)
  const CartOuter = styled.div`
  background-color: ${theme.primary}; 
  `
  const CartContainer = styled.div`
  box-shadow: 0 0px 10px ${theme.rgbText};
  `
  return (
    <CartOuter style={{  }}>
      <Layout>
        <CartContainer className='container mt-2' style={{ backgroundColor: "white"}}>
          <h3 className='pt-4 pb-4'>
            <BreadCrumb name1={"Cart"} href1="cart" />
          </h3>
          <div className='row pt-3 pb-3'>
            <CartComponent />
          </div>
        </CartContainer>
      </Layout>
    </CartOuter>
  )
}

export default CartIndex