import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router';
//style
import styled from '@emotion/styled';
import { Layout, Checkbox } from 'antd'
import { DollarOutlined, DownSquareOutlined, ArrowRightOutlined } from '@ant-design/icons'
import { ArrowBtn, MainButton } from '../../public/styleComponent/function/outsideStyled';
//redux
import { useDispatch, useSelector } from 'react-redux';
//function
import { catePriceFilterProduct, priceFilterValue, filterCategoriesValues, resetAll } from './function';
//component
import SidePanelFilter from '../materialComponents/SidePanelFilter';


const SidePanel = () => {
  const theme = useSelector(state => state.theme.themeMode)
  const price = useSelector((state) => state.filter.price)
  const categories = useSelector((state) => state.category.data)

  const [checkCategories, setCheckCategories] = useState([])

  const [priceValue, setPriceValue] = useState({
    price1: 1,
    price2: 10000,
  })
  const { price1, price2 } = priceValue

  useEffect(() => {
    price === false && setCheckCategories([])
    price === false && setPriceValue({ price1: 1, price2: 10000 })
  }, [price])
  const dispatch = useDispatch()
  const router = useRouter()

  const handlePrice = name => (event) => {
    const { value } = event.target
    setPriceValue({ ...priceValue, [name]: Number(value) })
  }

  // const handleCategories = (event) => {
  //   const id = event.target.value
  //   const clicked = checkCategories.indexOf(id)
  //   const all = [...checkCategories]
  //   if (clicked === -1) {
  //     all.push(id)
  //   } else {
  //     all.splice(clicked, 1)
  //   }
  //   setCheckCategories(all)
  //   filterCategoriesValues(all)
  //   catePriceFilterProduct(1, dispatch)
  //   priceFilterValue(0, 0)
  //   setPriceValue({ price1: 1, price2: 10000 })
  // }

  const priceSubmit = () => {
    setCheckCategories([])
    filterCategoriesValues([])
    priceFilterValue(price1, price2)
    router.query.search && router.push("/shop")
    router.query.slug && router.push("/shop")
    catePriceFilterProduct(1, dispatch)
  }

  const panelContainer = {
  background: theme.primary,
  height:"100%",
    boxShadow: `0px 0px 20px ${theme.text}`
  }
  const Category = styled.div`
    cursor:pointer;
    color: ${theme.text};
    &:hover{
      color: ${theme.active};
    }

  `

  const priceFilter = () => {
    return <div className='d-flex justify-content-center align-items-center '>
      <input
      style={{ width: "100%",backgroundColor:"white"}}
        placeholder='min'
        type="number"
        id="quantity"
        name="quantity"
        size={4}
        min="1"
        max="9999"
        value={price1}
        onChange={handlePrice("price1")}
      />
      -
      <input
      style={{ width: "100%",backgroundColor:"white"}}
        placeholder='max'
        type="number"
        id="quantity"
        name="quantity"
        min="1"
        max="10000"
        value={price2}
        onChange={handlePrice("price2")}
      />
      &nbsp;
      <ArrowBtn {...theme} onClick={priceSubmit}>
        <ArrowRightOutlined />
      </ArrowBtn>
    </div>
  }
  // const categoryFilter = () => {
  //   return <div className=''>
  //     {categories.map(c => {
  //       return <div key={c._id}>
  //         <Checkbox
  //           className='p-2 ps-5 pe-5'
  //           value={c._id}
  //           checked={checkCategories.includes(c._id)}
  //           onChange={handleCategories}>
  //           <span style={{ color: theme.primary }}>{c.name}</span>
  //         </Checkbox>
  //       </div>
  //     })}
  //   </div>
  // }
  const categoryFilter = () => {
    return <div className=''>
      {categories.map(c => {
        return <div key={c._id} 
        className='p-2 ps-5 pe-5'
        onClick={()=>router.push(`/category/${c.slug}`)}
        >
          <Category>{c.name}</Category>
        </div>
      })}
    </div>
  }


  return (
    <div className='d-flex flex-column panel' style={panelContainer}>
      <MainButton {...theme} href="#"
        className='butn butn-white d-inline mb-3 col-8 offset-2'
        onClick={() => resetAll(dispatch)}
      >
        Reset Filter
      </MainButton>
      {/* <SidePanelFilter
        price={priceFilter}
        category={categoryFilter}
      /> */}
      <SidePanelFilter
        data={[
          {
            title: "Price Filter",
            icon: DollarOutlined,
            content: priceFilter
          },
          {
            title: "Category Filter",
            icon: DownSquareOutlined,
            content: categoryFilter
          },
        ]}

      />
    </div>
  )
}

export default SidePanel