import React, { useState, useEffect } from 'react'
//style
import { MainButton } from '../../public/styleComponent/function/outsideStyled'
//router
import { withRouter } from 'next/router'
//material component
import SkeletonCard from '../materialComponents/SkeletonCard'
//component
import ProductCard from '../shop/components/ProductCard'
//redux
import { useSelector } from 'react-redux'
//action
import { filterCategory } from '../../actions/product'

const ShowCatProducts = ({router}) => {
  const [products, setProducts] = useState([])
  const [count,setCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const theme = useSelector(state => state.theme.themeMode)

  useEffect(() => {
    init()
  }, [router.query.slug])

  const init = () => {
    setLoading(true)
    filterCategory(router.query.slug, 0)
      .then(res => {
        setProducts(res.data.products)
        setCount(res.data.count)
        setLoading(false)
      })
      .catch(err => { console.log(err) })
  }

  const loadMoreProducts = () => {
    setLoading(true)
    filterCategory(router.query.slug, products.length)
      .then(res => {
        setProducts([...products, ...res.data.products])
        setLoading(false)
      })
      .catch(err => { console.log(err) })
  }

  const showLoading = () => (
    loading && <SkeletonCard count="12" column={3} />
  )

  return (
    <>
      {!products && products.length < 1 ?
        <SkeletonCard count="12" column={3} />
        :
        products.map((product) => {
          return <div className="col-lg-3 col-6" key={product._id}>
            <ProductCard product={product} />
          </div>
        })
      }
      {showLoading()}
      {count > products.length &&
        <MainButton  {...theme}
          className='butn butn-white d-inline mb-3 col-4 offset-4'
          onClick={loadMoreProducts}
        >
          Load More Products
        </MainButton>
      }
    </>
  )
}

export default withRouter(ShowCatProducts)