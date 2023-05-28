import React from 'react'
import Link from 'next/link';
import renderHTML from 'react-render-html';
//styled
import styled from '@emotion/styled';
import { MainButton } from '../../../../public/styleComponent/function/outsideStyled';
//for redux
import { useSelector, useDispatch } from 'react-redux'
import { selectThemeMode } from '../../../../redux/slices/theme/themeSelector'
import { addCartItem } from '../../../../redux/slices/cart/cartSlice';

const DualCard = ({product}) => {
    const theme = useSelector(selectThemeMode)
    const dispatch = useDispatch()
    const { slug, images, title, price, highlight } = product

    const fimg = {
        backgroundImage: `url(${images[0]})`,
    }

    const frontSide = {
        boxShadow: `0 0px 20px ${theme.text}`
    }
    const BackSide = styled.div`
        background-image: linear-gradient(to right bottom,
        ${theme.rgbPrimary},${theme.rgbSecondary});
        color:${theme.text};
    `
    return (
        <div className='d-card'>
            <div className="d-card_side" style={frontSide}>
                <div className="d-card_pic" style={fimg}></div>
                <h4 className='d-card_heading'>
                    <span className='d-card_heading-span'>
                        {title.substring(0, 20)}
                    </span>
                </h4>
                <div className="d-card_details">
                    {highlight && renderHTML(highlight)}
                   
                </div>
            </div>
            <BackSide className="d-card_side d-card_side-back">
                <div className="d-card_back-content">
                    <div className="d-card_price-box">
                        <p className="d-card_price-only">Only</p>
                        <p className="d-card_price-value">Rs {price}.00</p>
                    </div>
                    <div className='d-flex justify-content-around'>
                        <MainButton {...theme} href="#" className="butn butn-white"
                            onClick={() => { dispatch(addCartItem(product)) }}
                        >
                            Add to Cart
                        </MainButton>
                        <Link href={`/shop/${slug}`}>
                            <MainButton {...theme} href="" className="butn butn-white">View Product</MainButton>
                        </Link>
                    </div>
                </div>
            </BackSide>
        </div>
    )
}

export default DualCard