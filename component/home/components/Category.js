import React from 'react'
import Router from 'next/router'
import styled from '@emotion/styled'
import { Heading } from '../../../public/styleComponent/function/outsideStyled'
import { useSelector, useDispatch } from 'react-redux'
import { filterCategoriesValues, catePriceFilterProduct } from '../../shop/function'

const Category = () => {
    const dispatch = useDispatch();
    const categories = useSelector((state) => state.category.data);
    const theme = useSelector((state) => state.theme.themeMode);

    const clickFilter = (c) => {
        filterCategoriesValues([c])
        catePriceFilterProduct(1, dispatch)
        Router.push("/shop")
    }

    let container = {
        backgroundImage: `linear-gradient(${theme.primary},${theme.secondary})`
    }
    let Content = styled.a`
    background:${theme.primary};
    color: ${theme.text};
    @media screen and (max-width: 700px) {
        color: ${theme.text};
        box-shadow: 0 0 5px ${theme.text};
        text-shadow: 0 0 5px ${theme.text};
    }
    &::before {
        background:${theme.text};
    }
    &:hover::before {
        box-shadow: 0 0 15px ${theme.text};
    }
    &:hover {
        color: ${theme.text};
        box-shadow: 0 0 5px ${theme.text};
        text-shadow: 0 0 5px ${theme.text};
    } 
    `
    return (
        <div className='categoryContainer' style={container}>
            <div className="text-center">
                <Heading {...theme} className="heading mb-3">
                    Categories
                </Heading>
            </div>
            <ul className='category'>
                {categories.map(c => (
                    <li className='category_list' key={c._id}
                        onClick={() => clickFilter(c._id)}
                    >
                        <Content href="#" className='category_list_content' >
                            {c.name}
                        </Content>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Category