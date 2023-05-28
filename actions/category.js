import axios from 'axios'
import { API } from '../config'

export const createCategory = (name,parentId,bossId,token) => {
    return axios.post(`${API}/category`,
        { name,parentId,bossId},
        { headers: { Authorization: `Bearer ${token}` } }
    )
}

export const listCategory = () => {
    return axios.get(`${API}/categories`)
}

export const removeCategory = (_id,token) => {
    return axios.delete(`${API}/category/${_id}`,
        { headers: { Authorization: `Bearer ${token}` } }
    )
}
// export const removeSubCategory = (slug,token) => {
//     return axios.delete(`${API}/subcatremove/${slug}`,
//         { headers: { Authorization: `Bearer ${token}` } }
//     )
// }