import Router from 'next/router'
import React,{useEffect} from 'react'
import { isAuth } from '../../actions/auth'

const Admin = ({children}) => {
    useEffect(()=>{
        if(!isAuth()){
            Router.push('/auth/signin');
        }
        else if(isAuth().role!==1){
            Router.push('/user')
        }
    },[])
    return (
        <>
        {children}
        </>
    )
}
export default Admin