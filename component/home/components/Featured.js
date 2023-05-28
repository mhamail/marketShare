import React from 'react'
import Link from 'next/link'
//style
import styled from '@emotion/styled'
//component
import DualCard from './animationCard/DualCard'
import SkeletonCard from '../../materialComponents/SkeletonCard'
//redux
import { useSelector } from 'react-redux'
import { STATUSES } from '../../../redux/slices/product/featured'
import { selectThemeMode } from '../../../redux/slices/theme/themeSelector'

const Featured = () => {
    const theme = useSelector(selectThemeMode)
    const featuredList = useSelector((state) => state.featured.data)
    const status = useSelector((state) => state.featured.status);

    const Heading = styled.h1`
    background-image:linear-gradient(to right bottom,${theme.rgbPrimary},${theme.rgbSecondary});
    color:${theme.text};
    &:hover{
        text-shadow: 5px 20px 7px ${theme.rgbSecondary};
    }
    `
    const ShowProducts = styled.div`
    margin-right:15px;
    color:${theme.text};
    cursor:pointer;
    & a{
        color:${theme.text}; 
        &:hover{
            color:${theme.active}; 
        }
    }
   
    `
    if (status === STATUSES.ERROR) {
        return <Heading>Something ms-autowent wrong!</Heading>;
    }
    return (
        <div>
            <article className="overflow-hidden">
                <div style={{ width: "100%" }}>
                    <div className='d-flex justify-content-between'>
                        <Heading className="mb-4 heading ms-2">
                            Top Products
                        </Heading>
                        <ShowProducts className='show'>
                            <Link href="/shop" >
                                <a>
                                    Show All Products
                                </a>
                            </Link>
                        </ShowProducts>
                    </div>
                    <div className="row">
                        {status !== STATUSES.IDLE ?
                            <SkeletonCard count="6" column={4} /> :
                            featuredList.map((product) => {
                                return <div className='col-lg-3 col-6' key={product._id}>
                                    {product &&
                                        <DualCard
                                            product={product}
                                            fimage={product.images[0]}
                                            title={product.title}
                                            price={product.price}
                                            highlight={product.highlight}
                                            slug={product.slug}
                                            l1="10 day tours"
                                            l2="Up to 50 people"
                                            l3="10 tour guides"
                                            l4="Sleep in 5 star hotels"
                                            l5="Difficulty: Hard"
                                        />
                                    }
                                </div>
                            })
                        }

                    </div>
                </div>
            </article>
        </div>
    )
}

export default Featured