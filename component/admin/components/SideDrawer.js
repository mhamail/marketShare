import React from 'react'
import MaterialSideDrawer from '../../materialComponents/SideDrawer';
import { useSelector } from 'react-redux';

const SideDrawer = () => {
  const user = useSelector(state => state.user.data)
  return (
    <div className='pt-2 mt-2'>
      <div className="list-group">
        <MaterialSideDrawer link="/admin" name="Dashboard" />
        <MaterialSideDrawer link="/user" name="User Account" />
        <MaterialSideDrawer link="/admin/order" name="Manage Orders" />
        <MaterialSideDrawer link="/admin/crud/category" name="Manage Category" />
        <MaterialSideDrawer link="/admin/crud/product/create" name="Add Product" />
        <MaterialSideDrawer link="/admin/crud/product/list" name="List Product" />
        <MaterialSideDrawer link="/admin/crud/product/inactive" name="Inactive Product" />
        {user.username ===  "hashir" && 
          <MaterialSideDrawer link="/admin/allUser" name="All Users" />
        }
      </div>
    </div>
  )
}

export default SideDrawer