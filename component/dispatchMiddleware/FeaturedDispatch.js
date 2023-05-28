import React,{useEffect} from 'react'
import {useSelector,useDispatch} from 'react-redux'
import { fetchFeatured } from '../../redux/slices/product/featured'

const FeaturedDispatch = ({children}) => {
    const dispatch = useDispatch()

    const featured = useSelector((state) => state.featured.data)
    useEffect(()=>{
        featured.length <1 && dispatch(fetchFeatured())
    },[])
  return (
    <>
    {children}
    </>
  )
}

export default FeaturedDispatch