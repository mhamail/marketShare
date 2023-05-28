import React from 'react'
import { ShoppingCartOutlined } from '@ant-design/icons';
import { Badge } from "antd"
//redux
import { useSelector } from 'react-redux';
import { selectCartItems } from '../../../redux/slices/cart/cartSelector';

const CartBadge = ({style}) => {
  const cartItems = useSelector(selectCartItems)
  return (
    <div>
      <Badge count={cartItems.length} offset={[-8, 3]}>
          <ShoppingCartOutlined style={style} />
      </Badge>
    </div>
  )
}

export default CartBadge