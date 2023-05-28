import React from 'react'
import Link from 'next/link'
import { APP_NAME } from '../../config'
import { useSelector } from 'react-redux'

const BreadCrumb = ({ name1,href1}) => {
    const theme=useSelector(state=>state.theme.themeMode)
    return (
        <div>
            <Link href="/">
                <a className='text-muted' style={{color:theme.text}}>
                    Home
                </a>
            </Link>
            &nbsp; / &nbsp; 
            <Link href={`/${href1}`} style={{color:theme.text}}>
                <a className='text-muted'>
                    {name1}
                </a>
            </Link>
        </div>
    )
}

export default BreadCrumb