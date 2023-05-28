import axios from 'axios'
import { API } from '../config'
import { getCookie } from './auth'

const token=getCookie('token')

export const createProduct = (product, token) => {
    // console.log(product)
    return axios.post(`${API}/product`,
        product,
        { headers: { Authorization: `Bearer ${token}` } }
    )
}
export const updateProduct = (product, token, slug) => {
    return axios.put(`${API}/product/${slug}`,
        product,
        { headers: { Authorization: `Bearer ${token}` } }
    )
}

export const singleProduct = (slug) => {
    return axios.get(`${API}/product/${slug}`)
}

export const deleteProduct = (productsId, token) => {
    return axios.post(`${API}/product/checkedRemove`,
        { productsId },
        { headers: { Authorization: `Bearer ${token}` } }
    )
}

export const totalProducts = () => {
    return axios.get(`${API}/products/total`)
}

export const productRating = (productId, star, token) => {
    return axios.put(`${API}/product/${productId}`,
        { star },
        { headers: { Authorization: `Bearer ${token}` } }
    )
}

export const relatedProduct = (product, limit) => {
    return axios.post(`${API}/products/related`,
        { product, limit },
    )
}

export const searchProduct = (search, page) => {
    return axios.post(`${API}/products/listSearch?search=${search}`,
        { page }
    )
}
export const filterProducts = (price, category, page) => {
    return axios.post(`${API}/products/filterProducts`,
        { ...price, category, page }
    )
}
export const filterCategory = (slug, skip) => {
    return axios.post(`${API}/products/filterCategory`,
        { slug, skip }
    )
}
export const featuredProduct = (productId, featured) => {
    return axios.post(`${API}/products/featured`,
        {productId, featured },
        { headers: { Authorization: `Bearer ${token}` } }
    )
}
