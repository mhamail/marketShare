import React, { useState } from 'react'
//redux
import { useDispatch, useSelector } from 'react-redux'
import { setSortPrice } from '../../../redux/slices/product/filterProduct/filterSlice'
import { selectSortPrice } from '../../../redux/slices/product/filterProduct/productFilterSelector'
//function
import { sortPriceFilter } from '../function'

const SelectLowHighPrice = () => {
    const theme=useSelector(state=>state.theme.themeMode)
    const dispatch = useDispatch()
    const sortPrice = useSelector(selectSortPrice)

    const handleFilter = (event) => {
        dispatch(setSortPrice(event.target.value))
        sortPriceFilter(dispatch, event.target.value)
    }
    return (
        <div>
            <select
                className="form-select"
                id="inputGroupSelect01"
                onChange={handleFilter}
                value={sortPrice}
            >
                <option value='asc'>Low to High</option>
                <option value='desc'>High to Low</option>
                <option value='' selected>Latest</option>
            </select>
        </div>
    )
}

export default SelectLowHighPrice