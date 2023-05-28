import React, { useEffect } from 'react'
import { isAuth } from '../../actions/auth'
import { useSelector, useDispatch } from 'react-redux'
import { fetchInactiveProduct } from '../../redux/slices/product/inactiveProductSlice'

const InactiveProductDispatch = ({ children }) => {
  const dispatch = useDispatch()
  const product = useSelector((state) => state.inactiveProduct.data)

  useEffect(() => {
    const userId = isAuth && isAuth()._id
    !product && product.length < 1 && dispatch(fetchInactiveProduct({userId}))
  }, [])
  return (
    <>
      {children}
    </>
  )
}

export default InactiveProductDispatch