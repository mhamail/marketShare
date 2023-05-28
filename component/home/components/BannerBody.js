import React from 'react'
import styled from '@emotion/styled'
import Composition from './animationCard/Composition'
//styledComponentFunction
import { Button, Heading } from '../../../public/styleComponent/function/outsideStyled'
//redux
import { useSelector } from 'react-redux'



const BannerBody = () => {
    const theme = useSelector((state) => state.theme.themeMode)
    const Section = styled.div`
        background-color:${theme.bgLight};
        padding:50px 50px;
        margin:10px;
        box-shadow: 5px 0px 17px ${theme.bgLight};
        @media screen and (max-width: 700px) {
            padding:20px 20px;
            margin:0;
        }
        `
    const FontH = styled.div`
        color:${theme.text}
        `

    return (
        <Section>
            <div className='banner-body' >
                <div className="text-center">
                    <Heading {...theme} className="heading mb-5">
                        Wireless Wifi NVR Kit
                    </Heading>
                </div>
                <div className="row">
                    <div className="col-lg-6">
                        <FontH className='cfont-h'>Motion Detection Email Alert</FontH>
                        <p className='cfont-p'>When detecte motion, the camera can send email to alert,
                            then you can remote check what happer via mobile
                        </p>
                        <FontH className='cfont-h'>HDMI & VGA Output</FontH>
                        <p className='cfont-p'>
                            Cableless Wifi NVR Kit, connect all wifi cameras at the same time
                        </p>
                        <FontH className='cfont-h'>MULTI-PLATFORM OPERATION</FontH>
                        <p className='cfont-p'>Take a computer or mobile phone with you when you go out to achieve remote
                            monitoring through the internet
                        </p>
                        <Button {...theme} href="https://www.youtube.com/watch?v=bQi_TGoEJPs&ab_channel=MHMARKETPK"
                            className="butn-text">Watch Video &rarr;
                        </Button>
                    </div>
                    <div className="col-lg-6">
                        <Composition />
                    </div>
                </div>

            </div>
        </Section>
    )
}

export default BannerBody