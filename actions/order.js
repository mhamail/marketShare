import axios from 'axios'
import { API } from '../config'
import { getCookie } from './auth'

const token = getCookie('token')

export const totalOrders = () => {
    return axios.get(`${API}/orders/total`,
        { headers: { Authorization: `Bearer ${token}` } }
    )
}
export const createCodOrder = (token) => {
    return axios.post(`${API}/order/cod`,
        {},
        { headers: { Authorization: `Bearer ${token}` } })
}
export const anonymousCodOrder = (customer) => {
    return axios.post(`${API}/order/anonymousCod`,
        customer,
    )
}
export const updateOrderStatus = (orderId, orderStatus, token) => {
    return axios.post(`${API}/order/orderStatus`,
        { orderId, orderStatus },
        { headers: { Authorization: `Bearer ${token}` } })
}
