import axios from 'axios'
import Cookies from 'js-cookie'
import { API } from '../config'
import Router from 'next/router'

export const handleResponse = response => {
    if (response.status === 401) {
        signout(() => {
            Router.push({
                pathname: '/auth/signin',
                query: {
                    message: 'Your session is expired. Please signin'
                }
            })
        })
    }
}

export const signup = (user) => {
    return axios.post(`${API}/signup`,
        {...user}
    )
}

export const signin = (user) => {
    return axios.post(`${API}/signin`,
        { ...user }
    )
}

export const signout = (next) => {
    removeCookie('token')
    removeLocalStorage('user')
    next();
}

//--------------------------------------------

//cookie
export const setCookie = (key, value) => {
    if (typeof window !== "undefined") {
        Cookies.set(key, value, {
            expires: 1
        })
    }
}

export const removeCookie = (key) => {
    if (typeof window !== "undefined") {
        Cookies.remove(key, {
            expires: 1
        })
    }
}

export const getCookie = (key) => {
    if (typeof window !== "undefined") {
        return Cookies.get(key)
    }
}

//localStorage
export const setLocalStorage = (key, value) => {
    if (typeof window !== "undefined") {
        localStorage.setItem(key, JSON.stringify(value))
    }
}

export const removeLocalStorage = (key) => {
    if (typeof window !== "undefined") {
        return localStorage.removeItem(key)
    }
}

export const authenticate = (data, next) => {
    setCookie('token', data.token)
    // setLocalStorage('token', data.token)
    setLocalStorage('user', data.user)
    next();
}

export const isAuth = () => {
    if (typeof window !== "undefined") {
        const cookieChecked = getCookie('token')
        if (cookieChecked) {
            if (localStorage.getItem('user')) {
                return JSON.parse(localStorage.getItem('user'))
            }
        }
    }
}

export const updateProfile = (user, next) => {
    if (typeof window !== "undefined") {
        if (localStorage.getItem('user')) {
            let auth = JSON.parse(localStorage.getItem('user'));
            auth = user;
            localStorage.setItem('user', JSON.stringify(auth));
            next();
        }
    }
}