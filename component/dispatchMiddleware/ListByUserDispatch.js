import React, { useEffect } from 'react'
import { isAuth } from '../../actions/auth'
import { useSelector, useDispatch } from 'react-redux'
import { fetchListByUser } from '../../redux/slices/product/listByUserSlice'

const ListByUserDispatch = ({children}) => {
    const dispatch = useDispatch()
    const productByUser=useSelector(state=>state.listByUser.data)
    useEffect(()=>{
        const userId = isAuth && isAuth()._id 
        productByUser.length < 1 && dispatch(fetchListByUser({userId}))
    },[])

  return (
    <>{children}</>
  )
}

export default ListByUserDispatch