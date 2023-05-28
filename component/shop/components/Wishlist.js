import React, { useState } from 'react'
import { HeartOutlined, HeartFilled } from '@ant-design/icons';
import { addtoWishlist, removeWishlist } from '../../../actions/user';
import { getCookie,isAuth } from '../../../actions/auth';
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
//redux
import { useSelector,useDispatch } from 'react-redux';
import { fetchWishlist } from '../../../redux/slices/user/wishlistSlice';

const Wishlist = ({ productId }) => {
    const theme=useSelector(state=>state.theme.themeMode)
    const mywishlist = useSelector(state=>state.mywishlist.data)
    const dispatch=useDispatch()

    const existId = mywishlist.find((list)=>
        productId===list._id
    )
    const token = getCookie("token")

    const addWishlist = () => {
        isAuth() ?
        addtoWishlist(productId,token)
        .then(res=>{
           dispatch(fetchWishlist())
        })
        .catch(err=>console.log(err))
        :
        toast.error("please signin or signup the account")
    }
    const removeFromWishlist = () => {
        isAuth() ?
        removeWishlist(productId,token)
        .then(res=>{
            dispatch(fetchWishlist())
        })
        .catch(err=>console.log(err))
        :
        toast.error("please signin or signup the account")
    }
    //main body
    const wishlistdiv = () => {
        return <div className='text-center'>
            {!existId?
                <div onClick={addWishlist} style={{cursor:"pointer"}}>
                    <HeartOutlined style={{color:theme.text,fontSize:"25px"}} />
                    <br />
                    <span style={{color:theme.text2}}>Add to wish list </span>
                </div>
                :
                <div onClick={removeFromWishlist} style={{cursor:"pointer"}}>
                    <HeartFilled style={{color:theme.text,fontSize:"25px"}}/>
                </div>
            }
        </div>
    }
    return (
        <div>
            <ToastContainer/>
            {wishlistdiv()}
        </div>
    )
}

export default Wishlist