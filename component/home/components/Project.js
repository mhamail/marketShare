import React from 'react'
//style
import styled from '@emotion/styled'
//styledComponentFunction
import { Button, Heading } from '../../../public/styleComponent/function/outsideStyled'
//redux
import { useSelector } from 'react-redux'

const Project = () => {
    const theme = useSelector((state) => state.theme.themeMode)
    const Section = styled.div`
    background-image:linear-gradient(to right bottom,${theme.rgbPrimary},${theme.rgbSecondary}),
    url(images/rainwater.jpg)
    ;
        padding:50px 50px;
        margin:10px;
        box-shadow: 5px 0px 17px ${theme.shadow};
        @media screen and (max-width: 700px) {
            padding:20px 20px;
            margin:0;
        }
        `
    const FontH = styled.div`
        color:${theme.text}
        `

    return (
        <Section className='banner-project'>
            <div className="text-center">
                <Heading {...theme} className="heading mb-5">
                    Easy Life Projects *Rain Water Harvesting*
                </Heading>
            </div>
            <div className="row">
                <div className="col-lg-6">
                    <div className='imageSkew'>
                        <img src='images/rain.png' className='img-fluid' />
                    </div>
                </div>
                <div className="col-lg-6">
                    <FontH className='cfont-h'>Why do we Harvest Rainwater</FontH>
                    <p className='cfont-p'>Pakistan is part of 36 countries that are water-stressed. <br />
                        The rainwater harvesting system
                        is one of the best methods practised and followed to
                        support the conservation of water
                    </p>
                    <FontH className='cfont-h'>Where we can get all Equipments easily</FontH>
                    <p className='cfont-p'>
                        Pipe fittings and water tanks are easily available in any hardware shops,
                        also you can visit our shop if you lived in near our shop. Watch video 
                        for installation procedure
                    </p>

                    <Button {...theme} href="https://www.youtube.com/watch?v=CwRkMMiTBJI&ab_channel=MHMARKETPK"
                        className="butn-text">Watch Video &rarr;</Button>
                </div>
            </div>

        </Section>
    )
}

export default Project