import React from 'react'
import styled from '@emotion/styled';
import { UserOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import {Inventory,NoCrash} from '@mui/icons-material';


const CardDashboard = () => {
  const theme = useSelector(state => state.theme.themeMode)
  const totalUsers = useSelector(state => state.allUser.count)
  const totalProducts = useSelector(state => state.product.count)
  const totalOrders = useSelector(state => state.adminOrder.count)
  const Card = styled.div`
    background-image:linear-gradient(to right, ${theme.rgbPrimary}, ${theme.rgbSecondary});
    border-radius:10px;
    min-height:200px;
    & h5{
      color:${theme.text};
    }
    & h1{
      color:${theme.text};
      font-weight:bold;
    }
    `
  return (
    <div className="col-lg-12">
      <div className='row'>
        {/* USER */}
        <div className="col-lg-4">
          <div className="card bg-dark text-white">
            <Card className=" p-5">
              <h5 className="card-title fs-4">TOTAL USER</h5>
              <h1 className="card-text text-center">
                <UserOutlined style={{ fontSize: "70px" }} />
                <span>{totalUsers}</span>
              </h1>
            </Card>
          </div>
        </div>
        {/* PRODUCT */}
        <div className="col-lg-4">
          <div className="card bg-dark text-white">
            <Card className=" p-5">
              <h5 className="card-title fs-4">TOTAL PRODUCT</h5>
              <h1 className="card-text text-center">
                <Inventory style={{ fontSize: "70px" }} />
                <span>{totalProducts}</span>
              </h1>
            </Card>
          </div>
        </div>
        {/* ORDER */}
        <div className="col-lg-4">
          <div className="card bg-dark text-white">
            <Card className=" p-5">
              <h5 className="card-title fs-4">TOTAL ORDER</h5>
              <h1 className="card-text text-center">
              <NoCrash style={{ fontSize: "70px" }} />
                <span>{totalOrders}</span>
              </h1>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CardDashboard