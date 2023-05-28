
//redux
import { fetchProduct, setFilterProducts, setProductCount } from '../../redux/slices/productSlice'
import { setPrice, setSearch, setSortPrice } from '../../redux/slices/product/filterProduct/filterSlice';
//action
import { totalProducts, filterProducts, searchProduct } from '../../actions/product';

//component function
// default
export const totalProductsCount = (dispatch) => {
    totalProducts()
        .then(res => { dispatch(setProductCount(res.data)) })
}
export const resetAll = (dispatch) => {
    dispatch(setPrice(false))
    dispatch(setSearch(""))
    dispatch(setSortPrice(""))
    dispatch(fetchProduct())
    totalProductsCount(dispatch)
}
export const dataProducts = (data, dispatch) => {
    dispatch(setFilterProducts(data.product))
    dispatch(setProductCount(data.count))
}

//category
let categoriesValues = []
export const filterCategoriesValues = (value) => {
    categoriesValues = value
}
//price filter
let filterValue = []
export const priceFilterValue = (price1, price2) => {
    filterValue = [price1, price2]
}
export const catePriceFilterProduct = (page, dispatch) => {
    filterProducts(filterValue, categoriesValues, page)
        .then(res => {
            dataProducts(res.data, dispatch)
            dispatch(setPrice(true))
            dispatch(setSearch(""))
            dispatch(setSortPrice(""))
        })
        .catch(err => console.log(err))
}

//search
export const searchFilterProduct = (dispatch, search, page) => {
    dispatch(setPrice(false))
    dispatch(setSortPrice(""))
    searchProduct(search, page)
        .then(res => {
            dataProducts(res.data, dispatch)
        })
        .catch(err => console.log(err))
}
//sorPrice
export const sortPriceFilter = (dispatch, sortPrice, page) => {
    dispatch(setPrice(false))
    dispatch(setSearch(""))
    dispatch(fetchProduct({ sortPrice, limit: 12, page }))
}

export const handlePagination = (dispatch, price, search, sortPrice) => (page) => {
    search ?
        searchFilterProduct(dispatch, search, page)
        :
        price ?
            catePriceFilterProduct(page, dispatch)
            :
            sortPrice ?
                sortPriceFilter(dispatch, sortPrice, page)
                :
                dispatch(fetchProduct({ limit: 12, page }))
}