import Router from 'next/router'
import React,{useEffect} from 'react'
import { isAuth } from '../../actions/auth'

const Private = ({children}) => {
    useEffect(()=>{
        if(!isAuth()){
             Router.push({
                pathname: "/auth/signin",
                query: { from: Router.pathname }
            })
        }
    },[])
    return (
        <>
        {children}
        </>
    )
}
export default Private