import React, { useState, useEffect } from 'react'
import { withRouter } from 'next/router';
import Link from 'next/link';
//
import renderHTML from 'react-render-html';
//styled
import { WhatsAppOutlined } from '@ant-design/icons';
import styled from '@emotion/styled';
import { MainButton } from '../../public/styleComponent/function/outsideStyled';
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
//action
import { singleProduct } from '../../actions/product';
//env
import { MY_PHONE } from '../../config';
//component
import Layout from '../../component/Layout';
import RelatedProductCard from '../../component/shop/RelatedProductCard';
import ModalRating from '../../component/materialComponents/ModalRating';
import StarRatingsComponent from '../../component/materialComponents/StarRatingsComponent';
import { AverageRating } from '../../component/materialComponents/AverageRating';
import Wishlist from '../../component/shop/components/Wishlist';
//redux
import { useSelector, useDispatch } from 'react-redux';
import WishlistDispatch from '../../component/dispatchMiddleware/WishlistDispatch';
import { addCartItem } from '../../redux/slices/cart/cartSlice';

const SinglePage = ({ router }) => {
    const dispatch = useDispatch();
    const theme = useSelector(state => state.theme.themeMode)
    const [values, setValues] = useState({
        _id: "",
        title: "",
        slug: "",
        highlight: "",
        description: "",
        price: null,
        category: "",
        images: [],
        ratings: [],
        shipping: undefined,
        color: undefined,
        brand: undefined,
        loading: false,
    })

    const products = useSelector((state) => state.product.data)

    const { _id, title, highlight, description, price, images,
        ratings, shipping, color, brand, loading
    } = values;

    useEffect(() => {
        setValues({ ...values, loading: true })
        const getProduct = products.find((product) => (
            product.slug === router.query.slug)
        )
        if (getProduct) {
            setValues({ ...values, ...getProduct, loading: false })
        } else {
            initSingleProduct()
        }
    }, [router])

    //init
    const initSingleProduct = () => {
        setValues({ ...values, loading: true })
        singleProduct(router.query.slug)
            .then(response => {
                setValues({ ...response.data, loading: false })
            })
            .catch(err => console.log(err))
    }

    const showLoading = () => {
        return loading ?
            <div className='SpinnerOverlays '>
                <div className="SpinnerContainers"></div>
            </div>
            : ''
    }

    let actionBar = {
        backgroundImage: `linear-gradient(to right bottom,${theme.rgbPrimary},${theme.rgbSecondary})`,
        padding: "10px"
    }

    let carouselContainer = {
        boxShadow: `0 0px 20px ${theme.rgbText}`
    }
    const Description = styled.div`
    max-width:100%;
    box-shadow: 5px 10px 15px ${theme.rgbSecondary};
    padding:10px;
    `
    const RenderHtml = styled.span`
    h1,h2,h3,h4,h5,h6,ol,li,p,ul,span{
        color:${theme.text2}!important;
    }
    img{
        max-width:100%;
    }
    `
    const topPanel = () => {
        return <div className="row justify-content-between">
            <div className="col-lg-5 p-3 ge-5" style={carouselContainer}>
                <Carousel>
                    {images && images.map((image, i) =>
                        <img src={image} key={i} alt={title} />
                    )
                    }
                </Carousel>
                {/* <img
                    className='img-fluid'
                    src={images && images.length > 0 && images[0]}
                    alt={title}
                /> */}
            </div>
            <div className="col-lg-6 mt-md-4">
                <h3 style={{ color: theme.text }}>
                    {title}
                </h3>
                <h4 style={{ color: theme.text }}>Price: {price}.00 Rs</h4>
                {!loading && values.ratings && values.ratings.length > 0
                    ? AverageRating(values)
                    : "No rating yet"
                }
                <p style={{ color: theme.text2 }}>
                    | 0 Answered Questions
                </p>
                <h4 style={{ color: theme.active }}>Product shorts</h4>
                <RenderHtml>
                    {highlight && renderHTML(highlight)}
                </RenderHtml>
                <h4 style={{ color: theme.active }}> Contact on whatsapp (timing 9am to 3pm)</h4>

                <Link href={`https://wa.me/92${MY_PHONE}`} passHref>
                    <a className='text-dark' target="_blank" rel="noopener noreferrer">
                        <WhatsAppOutlined style={{ fontSize: "2em", color: "#150" }} />
                        &nbsp;&nbsp; <span style={{ color: theme.text }}>0{MY_PHONE}</span>
                    </a>
                </Link>
                <div className='d-flex justify-content-evenly align-items-center'
                    style={actionBar}
                >
                    <div>
                        <MainButton {...theme} href="#"
                            className='butn butn-white p-2'
                            onClick={() => { dispatch(addCartItem(values)) }}
                        >
                            Add To Cart
                        </MainButton>
                    </div>
                    <Wishlist productId={_id} />
                    <div style={{ width: "auto" }}>
                        <StarRatingsComponent
                            ratings={ratings}
                            _id={_id}
                            refreshPage={initSingleProduct}
                            toast={toast} />
                        <br />
                        <p className="text-muted text-center" style={{ color: theme.text }}> Your Rating</p>
                    </div>
                </div>
            </div>
        </div>
    }
    const downpanel = () => {
        return <>
            <Description className='pt-4 mt-4 mb-4'>
                <RenderHtml className='text-center' style={{ color: theme.text }}>
                    {description && renderHTML(description)}
                </RenderHtml>
            </Description>
            <h4 style={{ color: theme.text }}>Related Product</h4>
            <div className='row'>
                {!loading && values && values.category &&
                    <RelatedProductCard product={values} />
                }
            </div>
        </>
    }

    let page = {
        color: `${theme.text2}`,
        backgroundColor: `${theme.primary}`
    }
    return (
        <div style={page}>
            <ToastContainer />
            <Layout>
                <WishlistDispatch>
                    <div className="container pt-5">
                        {showLoading()}
                        {topPanel()}
                        {downpanel()}
                    </div>
                </WishlistDispatch>
            </Layout>
        </div>
    )
}

export default withRouter(SinglePage)