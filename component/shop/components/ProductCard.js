import React, { useState } from 'react'
import Link from 'next/link'
import { Tooltip } from 'antd'
import { MainButton } from '../../../public/styleComponent/function/outsideStyled'
import Image from 'next/image'
//style
import styled from '@emotion/styled'
//redux
import { useDispatch, useSelector } from 'react-redux'
import { addCartItem } from '../../../redux/slices/cart/cartSlice'

const ProductCard = ({ product }) => {
    const theme = useSelector(state => state.theme.themeMode)
    const { title, images, price, slug } = product
    const [tooltip, setTooltip] = useState("click to add")
    const dispatch = useDispatch()

    const Product = styled.div`
     box-shadow: 5px 5px 10px ${theme.text};
     padding:5px;
    `
    return (
        <Product className="card mb-5 " >
            <Link href={`/shop/${slug}`}>
                <a>
                    <div className="text-center imageHover">
                        <div className="image p-2 ">
                            {images &&
                                <Image className="img-fluid"
                                    style={{}}
                                   width={200}
      height={200}
                                    src={images[0]}
                                    alt={title}
                                />
                            }
                        </div>
                        <div className="button btn btn-light w-100">
                            Click to preview
                        </div>
                    </div>
                </a>
            </Link>


            <div className="p-3" style={{ color: theme.text, background: theme.rgbPrimary }}>
                <p className="fs-6">
                    {title.substring(0, 15)}...
                    <br />
                    <span style={{ color: theme.active }}>price {price}.00 Rs</span>
                </p>
                <Tooltip title={tooltip}>
                    <div className="d-flex justify-content-center" >
                        <MainButton {...theme} href="#"
                            type="button"
                            className="position-relative butn butn-white w-100"
                            onClick={() => { dispatch(addCartItem(product)) }}
                        >
                            Add to Cart
                        </MainButton>
                    </div>
                </Tooltip>

            </div>
        </Product>
    )
}

export default ProductCard