import React from 'react'
import Layout from '../../../component/Layout'
import styled from '@emotion/styled'
import { useSelector } from 'react-redux'

const PasswordForgot = () => {
  const theme = useSelector(state => state.theme.themeMode)

  const Button = styled.div`
  box-shadow: 0 0px 20px ${theme.rgbText};
  color:${theme.text};
  background-color:${theme.primary};
  `
  const Page = styled.div`
  color:${theme.text2};
  background-color:${theme.primary};
  `
  return (
    <Layout>
      <Page className='d-flex justify-content-center align-items-center' style={{ height: "100vh", width: "100%" }}>
        <Button className='btn btn-lg'>
          Please whatsapp or text on this number 03312001223 with this code i forgot the password
        </Button>
      </Page>
    </Layout>
  )
}

export default PasswordForgot