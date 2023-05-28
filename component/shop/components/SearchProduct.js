import React, { useState } from 'react'
import { withRouter } from 'next/router';
//redux
import { useDispatch, useSelector } from 'react-redux';
import { setSearch } from '../../../redux/slices/product/filterProduct/filterSlice'
//component
import SearchComponent from '../../materialComponents/SearchComponent';

const SearchProduct = ({router}) => {
    const dispatch = useDispatch()
    const [keyword, setKeyword] = useState('')

    const clickSearch = () => {
        router.push(`/shop?search=${keyword}`)
        dispatch(setSearch(keyword))
        setKeyword("")
    }

    return (
        <div>
            <SearchComponent
                keyword={keyword}
                setKeyword={setKeyword}
                placeholder="search products"
                onClick={clickSearch}
            />
        </div>
    )
}

export default withRouter(SearchProduct)