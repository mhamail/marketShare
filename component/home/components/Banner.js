import React from 'react'
import Link from 'next/link';
//style
import styled from '@emotion/styled'
import { WhatsAppOutlined } from '@ant-design/icons';
//redux
import { useSelector } from 'react-redux';
import { selectThemeMode } from '../../../redux/slices/theme/themeSelector';
import { MY_PHONE } from '../../../config'
// component
import { CustomHeader } from '../../Layout';


const Banner = () => {
    const theme = useSelector(selectThemeMode)
    const BannerDiv = styled.div`
        width:"100%";
         filter: grayscale(20%);
        background-image:linear-gradient(to right bottom,rgba(15,15,15,0.8),rgba(38,38,38,0.8)),url(images/drone.jpg);
        color:#fff;
         box-shadow: 0px 0px 20px rgba(38,38,38,0.8);
        `;
    const Heading = styled.h1`
        color:#fff;
        &:hover{
        text-shadow: 5px 20px 7px ${theme.rgbSecondary};
        }
         @media screen and (max-width: 700px) {
         font-size:0.9em;
         padding:0 20px;
         }
        `
    const Whatsapp = styled.div`
        display:flex;
        color:#ddd;
        cursor:pointer;
        margin:50px;
        &:hover{
        color:#fff;
        }
        @media screen and (max-width: 700px) {
        margin:20px;
            & WhatsAppOutlined{
        font-size:0.4em;
            }
            span{
                font-size:0.9em;
            }
        }
        `
    return (
        <div className='container-fluid m-0 p-0'>

            <BannerDiv className='banner'>
                <CustomHeader color="#fff" opacity="#ddd" />
                <div className="links">
                    <div>
                        <img src="../../images/logo.png" className='img-fluid' />
                    </div>

                    <div className="whatsapp">
                        <Link href={`https://api.whatsapp.com/send?phone=92${MY_PHONE}`} passHref>
                            <a target="_blank" rel="noopener noreferrer">
                                <Whatsapp>
                                    <WhatsAppOutlined style={{ fontSize: "2em", color: "#150", marginLeft: "20px" }} />
                                    <span>
                                        &nbsp;Help &nbsp;
                                    </span>
                                </Whatsapp>
                            </a>
                        </Link>
                    </div>
                </div>

                <div className='banner_content'>
                    <Heading className='banner-heading'> Welcome to MH Market </Heading>
                    <p>Discover a low-cost drone, ideal for photography and video enthusiasts seeking a fun and innovative experience. Limited offer available</p>
                    <Link href={`/shop/sf-819-drone-with-90-degree-fov-camera-fpv-quadcopter-brushless-motor-for-adult-beginners-profesional-photography-aircraft`} >
                        <button className='btn btn-light shadow btn-sm'>   Click to View Product
                        </button>
                    </Link>
                </div>


            </BannerDiv>
        </div>
    )
}

export default Banner