import axios from 'axios'
import { API } from '../config'
import { getCookie } from './auth'

const token = getCookie('token')
  
export const totalUsers = () => {
    return axios.get(`${API}/users/total`,
        { headers: { Authorization: `Bearer ${token}` } }
    )
}
export const updateUser = (user, token) => {
    return axios.put(`${API}/user/Profile`,
        user,
        { headers: { Authorization: `Bearer ${token}` } }
    )
}
export const updateUserByAdmin = (user, token, username) => {
    return axios.put(`${API}/user/updateByAdmin/${username}`,
        user,
        { headers: { Authorization: `Bearer ${token}` } }
    )
}
export const readUser = (token) => {
    return axios.get(`${API}/user/Profile`,
        { headers: { Authorization: `Bearer ${token}` } })
}
export const deleteUser = (username, token) => {
    return axios.delete(`${API}/user/${username}`,
        { headers: { Authorization: `Bearer ${token}` } }
    )
}
export const searchUserByAdmin = (search, phone, token) => {
    return axios.post(`${API}/user/searchUser?search=${search}&phone=${phone}`,
        { headers: { Authorization: `Bearer ${token}` } }
    )
}
export const userCart = (cart, token) => {
    return axios.post(`${API}/cart/userCart`,
        cart,
        { headers: { Authorization: `Bearer ${token}` } })
}
export const readCart = (token) => {
    return axios.get(`${API}/cart/userCart`,
        { headers: { Authorization: `Bearer ${token}` } })
}
export const addtoWishlist = (productId, token) => {
    return axios.post(`${API}/user/addWishlist`,
        { productId },
        { headers: { Authorization: `Bearer ${token}` } })
}
export const removeWishlist = (productId, token) => {
    return axios.post(`${API}/user/removeWishlist`,
        { productId },
        { headers: { Authorization: `Bearer ${token}` } })
}