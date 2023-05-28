import axios from 'axios'
import { API } from '../config'

export const createInactive = (productsId,token) => {
    // console.log(product)
    return axios.post(`${API}/inactive/product`,
        {productsId},
        { headers: { Authorization: `Bearer ${token}` } }
    )
}
export const inactiveTOactive = (productsId,token) => {
    // console.log(product)
    return axios.post(`${API}/inactiveTOactive`,
        {productsId},
        { headers: { Authorization: `Bearer ${token}` } }
    )
}

export const deleteInactive = (productsId,token) => {
    return axios.post(`${API}/inactive/checkedRemove`,
    {productsId},
         { headers: { Authorization: `Bearer ${token}` } }
    )
}