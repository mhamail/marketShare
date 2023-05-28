import React,{useEffect} from 'react'
import {useSelector,useDispatch} from 'react-redux'
import { fetchUser } from '../../redux/slices/user/userSlice'

const UserDispatch = ({children}) => {
    const dispatch = useDispatch()

    const user = useSelector((state) => state.user.data)

    useEffect(()=>{
        !user.username && dispatch(fetchUser())
    },[])
  return (
    <>
    {children}
    </>
  )
}

export default UserDispatch