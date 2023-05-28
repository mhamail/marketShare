import React from 'react'
import Header from './header/Header'
import Footer from './header/Footer'
import TopMenu from './header/TopMenu'
import ThemeMiddleware from './dispatchMiddleware/ThemeMiddleware'
//redux
import { useSelector } from 'react-redux'
//style
import styled from '@emotion/styled'


const Layout = ({ children }) => {
    return (
        <ThemeMiddleware>
            <div style={{ minHeight: "calc(100vh - 40px)" }}>
                <CustomHeader />
                {children}
            </div>
            <Footer />
        </ThemeMiddleware>
    )
}

export default Layout


//top menu-header component
export const CustomHeader = ({color,opacity}) => {

    const theme = useSelector(state => state.theme.themeMode)
    const TopPanel = styled.div`
    display:flex ;
    flex-direction:column ;
        box-shadow: 0px 2px 10px ${theme.text};
        border-bottom-left-radius:20px ;
        border-bottom-right-radius:20px ;      
        color:${color?color:theme.text}; 
        `
    return (
        <TopPanel>
            <TopMenu color={color} opacity={opacity}/>
            <Header color={color} opacity={opacity}/>
        </TopPanel>
    )
}


