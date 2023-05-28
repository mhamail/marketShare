import React from 'react'
import { YoutubeOutlined, FacebookOutlined } from '@ant-design/icons';
import styled from '@emotion/styled'
import { Heading } from '../../../public/styleComponent/function/outsideStyled';
//redux
import { useSelector } from 'react-redux';

const OurPages = () => {
    const theme = useSelector(state => state.theme.themeMode)
    const Section = styled.div`
        background-color:${theme.bgLight};
        padding:50px 50px;
        @media screen and (max-width: 700px) {
            padding:20px 20px;
            margin:0;
        }
        `
    const Card = styled.div`
        background-color: ${theme.rgbText};
        box-shadow: 0 15px 4px ${theme.shadow};
        border-radius:20px;
        `
        const Title=styled.div`
        color:${theme.rgbPrimary};
        @media screen and (max-width: 700px) {
            font-size:1.2em;
        }
        `
    return (
        <Section className='section-ourpages'>
             <div className="text-center">
                    <Heading {...theme} className="heading mb-5">
                       Our Pages
                    </Heading>
                </div>
            <div className='container-fluid'>
                <div className="row">
                    <div className="col-4 ">
                        <a href='https://youtube.com/mhmarketpk'>
                            <Card className="simple-card">
                                <YoutubeOutlined style={{ fontSize: "50px", color: "red", height: "50px" }} />
                                <Title>Youtube</Title>
                            </Card>
                        </a>
                    </div>
                    <div className="col-4">
                        <a href="https://fb.com/mhmarketpk">
                            <Card className="simple-card">
                                <FacebookOutlined style={{ fontSize: "50px", color: "blue", height: "50px" }} />
                                <Title>Facebook</Title>
                            </Card>
                        </a>
                    </div>

                    <div className="col-4">
                        <a href="https://daraz.pk/shop/mh-market">
                        <Card className="simple-card">
                            <img src="images/daraz.png" className='img-fluid' style={{ height: "50px",color: theme.rgbPrimary, }} />
                            <Title>Daraz.pk</Title>
                        </Card>
                        </a>
                    </div>
                </div>
            </div>
        </Section>
    )
}

export default OurPages