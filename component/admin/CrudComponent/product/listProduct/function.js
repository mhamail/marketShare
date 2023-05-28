// action
import { deleteProduct } from '../../../../../actions/product';
import { handleResponse, getCookie, isAuth } from '../../../../../actions/auth';
import { createInactive,deleteInactive,inactiveTOactive } from '../../../../../actions/inactiveProduct';
import { toast } from 'react-toastify'
import { fetchListByUser } from '../../../../../redux/slices/product/listByUserSlice';
import { fetchInactiveProduct } from '../../../../../redux/slices/product/inactiveProductSlice';

const token = getCookie("token")
const userId = isAuth() && isAuth()._id

//list active product
export const del = (checkProduct, dispatch) => {
    let answer = window.confirm(
        'Are you sure you want to delete?'
    );
    if (answer) {
        deleteProduct(checkProduct, token)
            .then(response => {
                toast.success("product delete successfully")
                dispatch(fetchListByUser({ userId }))
            })
            .catch(err => {
                toast.error(err.response.data.error)
                handleResponse(err.response)
            })
    }
}

export const inactive = (checkProduct, dispatch) => {
    createInactive(checkProduct, token)
        .then(response => {
            toast.success("product Inactive successfully")
            dispatch(fetchListByUser({ userId }))
            dispatch(fetchInactiveProduct({ userId }))
        })
        .catch(err => {
            toast.error(err.response.data.error)
            handleResponse(err.response)
        })
}

//list inactive product
export const delInactive = (checkProduct, dispatch) => {
    let answer = window.confirm(
        'Are you sure you want to delete?'
    );
    if (answer) {
        deleteInactive(checkProduct, token)
            .then(response => {
                toast.success("product delete successfully")
                dispatch(fetchInactiveProduct({ userId }))
            })
            .catch(err => {
                toast.error(err.response.data.error)
                handleResponse(err.response)
            })
    }
}
export const active = (checkProduct,dispatch) => {
    inactiveTOactive(checkProduct, token)
        .then(response => {
            toast.success("product active successfully")
            dispatch(fetchInactiveProduct({ userId }))
            dispatch(fetchListByUser({ userId }))

        })
        .catch(err => {
            toast.error(err.response.data.error)
            handleResponse(err.response)
        })
}