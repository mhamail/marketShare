import React, { useEffect } from 'react'
import { totalUsers } from '../../actions/user'
import { totalProducts } from '../../actions/product'
import { totalOrders } from '../../actions/order'
//redux
import { useDispatch } from 'react-redux'
import { setUserCount } from '../../redux/slices/user/allUserSlice'
import { setProductCount } from '../../redux/slices/productSlice'
import { setAllOrderCount } from '../../redux/slices/order/adminOrderSlice'


const AdminDashboardDispatch = ({ children }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    userCount()
    productCount()
    orderCount()
  }, [])

  const userCount = () => {
    totalUsers()
      .then(res => { dispatch(setUserCount(res.data)) })
  }
  const productCount = () => {
    totalProducts()
      .then(res => { dispatch(setProductCount(res.data)) })
  }
  const orderCount = () => {
    totalOrders()
      .then(res => { dispatch(setAllOrderCount(res.data)) })
  }

  return (
    <>{children}</>
  )
}

export default AdminDashboardDispatch