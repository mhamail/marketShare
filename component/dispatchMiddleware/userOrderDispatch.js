import { fetchUserOrder } from "../../redux/slices/order/userOrderSlice";
import React,{useEffect} from 'react'
import {useSelector,useDispatch} from 'react-redux'

const UserOrderDispatch = ({children}) => {
    const dispatch = useDispatch()

    const userOrder = useSelector((state) => state.userOrder.data)

    useEffect(()=>{
    userOrder.length<1 && dispatch(fetchUserOrder())
    },[])
  return (
    <>
    {children}
    </>
  )
}

export default UserOrderDispatch