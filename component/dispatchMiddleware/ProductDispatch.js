import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { withRouter } from 'next/router'
import { fetchProduct,setProductCount } from '../../redux/slices/productSlice'
import { totalProducts } from '../../actions/product'

const ProductDispatch = ({ children, router }) => {
  const dispatch = useDispatch()

  const product = useSelector((state) => state.product.data)

  useEffect(() => {
    product.length < 1 && dispatch(fetchProduct())
    productCount()
  }, [])

  const productCount = () => {
    totalProducts()
      .then(res => { dispatch(setProductCount(res.data)) })
  }

return (
  <>
    {children}
  </>
)
}

export default withRouter(ProductDispatch)