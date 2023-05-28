import { toast } from 'react-toastify'
//action
import { updateUserByAdmin,searchUserByAdmin,deleteUser } from "../../../actions/user";
import { getCookie } from "../../../actions/auth";
//redux
import { fetchAllUser } from "../../../redux/slices/user/allUserSlice";

const token=getCookie('token')

export const clickSearch = (keyword,toggle,setSearchList) => {
    let phone = parseInt(keyword)
    searchUserByAdmin(keyword, toggle && phone, token)
        .then(res => {
            setSearchList(res.data)
        })
        .catch(err => toast.error("no user found"))
}

export const handleChange = (username,formData,dispatch) => (event) => {
    formData.set('role', event.target.value)
    updateUserByAdmin(formData, token, username)
        .then(res => {
            dispatch(fetchAllUser())
            toast.success(`${username} update successfully`)
        })
        .catch(err => console.log(err))
}

export const resetPassword = (username,formData,dispatch) => {
    let answer = window.confirm(
        `Are you sure you want to reset password of ${username}?`
    );
    if (answer) {
        formData.set('password', "123456")
        updateUserByAdmin(formData, token, username)
            .then(res => {
                dispatch(fetchAllUser())
                toast.success(`${username} update successfully`)
            })
            .catch(err => console.log(err))
    }
}

export const removeUser = (username,dispatch) => {
    let answer = window.confirm(
        `Are you sure you want to delete ${username}?`
    );
    let answer2;
    if (answer) {
        answer2 = window.confirm(
            `${username} will be delete permanently`
        );
        if (answer2) {
            deleteUser(username, token)
                .then(res => {
                    dispatch(fetchAllUser())
                    toast.success(`${username} delete successfully`)
                })
                .catch(err => console.log(err))
        }
    }
}
