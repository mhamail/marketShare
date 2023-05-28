import React from 'react'
import Footer from '../component/header/Footer'
import Homepage from '../component/home/Hompage'
import FeaturedDispatch from '../component/dispatchMiddleware/FeaturedDispatch'
import Router from 'next/router'
//redux
import { useSelector } from 'react-redux'
import { selectThemeMode } from '../redux/slices/theme/themeSelector'
import CategoriesDispatch from '../component/dispatchMiddleware/CategoriesDispatch'
import ThemeMiddleware from '../component/dispatchMiddleware/ThemeMiddleware'

import { MY_PHONE2 } from '../config'
const Index = () => {
  const theme = useSelector(selectThemeMode)
  // console.log(MY_PHONE2)

  const home = {
    backgroundColor: `${theme.primary}`,
    color: `${theme.text}`,
  }
  Router.push("/shop")
  return (
    <ThemeMiddleware>
      {/* <CategoriesDispatch>
        <div style={home}>
          <FeaturedDispatch>
            <Homepage />
          </FeaturedDispatch>
        </div>
        <Footer />
      </CategoriesDispatch> */}
    </ThemeMiddleware>
  )
}

export default Index