import React, { useEffect } from 'react'
import { themeMode } from '../../public/styleComponent/theme'
import { useDispatch, useSelector } from 'react-redux'
import { selectThemeMode } from '../../redux/slices/theme/themeSelector'
import { setTheme } from '../../redux/slices/theme/theme'

const ThemeMiddleware = ({ children }) => {
  const theme = useSelector(selectThemeMode)
  const dispatch = useDispatch()
  useEffect(() => {
    !theme.mode && dispatch(setTheme(themeMode.light))
  }, [])
  return (
    <div>{children}</div>
  )
}

export default ThemeMiddleware