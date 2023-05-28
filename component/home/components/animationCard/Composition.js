import React from 'react'
import styled from '@emotion/styled'
import { useSelector } from 'react-redux'

const Composition = () => {
    const theme = useSelector(state=>state.theme.themeMode)
    const Image = styled.img`
    box-shadow: 0 15px 40px ${theme.shadow};
    &:hover{
        outline: 6px solid ${theme.text2};
        box-shadow: 0 15px 40px ${theme.bgLight};
    }
    `
    return (
        <div className="composition">
            <Image src="images/banner-body.jpg" alt="Photo 1"
                className="composition_photo composition_photo-p1"
            />
            <Image src="images/banner-body2.jpg" alt="Photo 2"
                className="composition_photo composition_photo-p2"
            />
            <Image src="images/banner-body3.jpg" alt="Photo 3"
                className="composition_photo composition_photo-p3"
            />
        </div>
    )
}

export default Composition