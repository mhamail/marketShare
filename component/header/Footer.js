import React from 'react'
import { MY_PHONE } from '../../config'

const Footer = () => {
    return (
            <div className='bg-dark d-flex justify-content-center align-items-center p-2' 
            style={{width:"100%",height:"40px"}}>
                <div className='text-secondary'>
                    Whatsapp Number # 0{MY_PHONE}
                </div>
            </div>
    )
}

export default Footer