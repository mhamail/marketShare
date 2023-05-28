import React,{useEffect} from 'react'
import {useSelector,useDispatch} from 'react-redux'
import { fetchCategories } from '../../redux/slices/categorySlice'

const CategoriesDispatch = ({children}) => {
    const dispatch = useDispatch()
    const categories = useSelector((state) => state.category.data)
     
    useEffect(()=>{
        categories.length <1 && dispatch(fetchCategories())
      },[])
  return (
    <>
    {children}
    </>
  )
}

export default CategoriesDispatch