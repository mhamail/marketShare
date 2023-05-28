import styled from "@emotion/styled"

export const Button = styled.a`
    color: ${props => props.text2};
    border-bottom: 1px solid ${props => props.text2};
    &:hover{
    background-color: ${props => props.text2};
    color: ${props => props.primary};
    text-shadow: 0 1rem 2rem ${props => props.shadow};
    }
    `
export const MainButton = styled.button`
    background-color:${props => props.text};
    color:${props => props.primary};
    &:hover{
        box-shadow: 0 10px 20px ${props => props.primary};
        color:${props => props.rgbSecondary};
    }
    &:active {
        box-shadow: 0 10px 20px ${props => props.primary};
    }
    &::after {
        background-color:${props => props.text};
    }
    `

export const Heading = styled.h1`
    background-image:linear-gradient(to right bottom,${props => props.rgbPrimary},${props => props.rgbSecondary});
    color:${props => props.text};
    &:hover{
        text-shadow: 5px 20px 7px ${props => props.rgbSecondary};
    }`

export const ArrowBtn = styled.div`
    color: ${props => props.primary};
    background: ${props => props.text};
    padding: 3px;
    margin-right: 3px;
    cursor: pointer;
    border-radius: 20%;
    &:hover{
        background-color: ${props => props.primary};
        color: ${props => props.active};
    }
    `