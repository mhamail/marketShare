import React, { useState } from 'react'
//redux
import { useDispatch, useSelector } from 'react-redux'

const LowHighPriceFilter = ({sortPrice,setSortPrice,fetchListByUser,userId}) => {
    const theme=useSelector(state=>state.theme.themeMode)
    const dispatch = useDispatch()

    const handleFilter = (event) => {
        setSortPrice(event.target.value)
        dispatch(fetchListByUser({userId,sortPrice:event.target.value}))
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

export default LowHighPriceFilter