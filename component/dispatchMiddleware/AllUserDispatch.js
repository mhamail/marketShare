import React, { useEffect } from 'react'
import {useSelector,useDispatch} from 'react-redux'
import { fetchAllUser } from '../../redux/slices/user/allUserSlice'

const AllUserDispatch = ({children}) => {
    const dispatch = useDispatch()
    const users = useSelector((state) => state.allUser.data)

    useEffect(()=>{
       users.length<1 && dispatch(fetchAllUser())
    },[])

  return (
    <>{children}</>
  )
}

export default AllUserDispatch