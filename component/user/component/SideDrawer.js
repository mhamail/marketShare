import React from 'react'
import MaterialSideDrawer from '../../materialComponents/SideDrawer'

const SideDrawer = () => {
  return (
    <div className='pt-2 mt-2'>
      <div className="list-group">
        <MaterialSideDrawer link="/user" name="Dasboard"/>
        <MaterialSideDrawer link="/user/wishlist" name="Wishlist"/>
        <MaterialSideDrawer link="/user/profile" name="My Profile"/>
        <MaterialSideDrawer link="/user/order" name="My Orders"/>
      </div>
    </div >
  )
}

export default SideDrawer