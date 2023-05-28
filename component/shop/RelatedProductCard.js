import React, { useState, useEffect } from 'react'
//action
import { relatedProduct } from '../../actions/product';
//redux
import { useSelector } from 'react-redux'
//component
import ProductCard from './components/ProductCard';

const RelatedProductCard = ({ product }) => {
    const theme = useSelector(state => state.theme.themeMode)
    const [products, setProducts] = useState([])

    const { _id, category } = product

    useEffect(() => {
        init()
    }, [])

    const init = () => {
        const product = { _id, category }
        relatedProduct(product)
            .then(res => setProducts(res.data))
            .catch(err => console.log(err))
    }


    // main body
    return (
        <>
            {
                products && products.length > 0 ?
                    products.map((related) => {
                        return <div className="col-lg-3 col-6" key={related._id}>
                            <ProductCard product={related} />
                        </div>
                    })
                    :
                    <h6 style={{ color: theme.text }}>No related products found</h6>
            }

        </>
    )
}

export default RelatedProductCard