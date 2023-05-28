import { isAuth } from "../../actions/auth";
import { fetchAllOrder } from "../../redux/slices/order/adminOrderSlice";
import { fetchVendorOrder } from "../../redux/slices/order/vendorOrderSlice";

import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

const AdminOrderDispatch = ({ children }) => {
  const dispatch = useDispatch()

  const adminAllOrder = useSelector((state) => state.adminOrder.data)
  const vendorOrder = useSelector((state) => state.vendorOrder.data)

  useEffect(() => {
    isAuth && isAuth().username === "hashir" ?
      adminAllOrder.length < 1 && dispatch(fetchAllOrder({ limit: 10 }))
      :
      vendorOrder.length < 1 && dispatch(fetchVendorOrder({ limit: 10 }))
    }, [])
  return (
    <>
      {children}
    </>
  )
}

export default AdminOrderDispatch