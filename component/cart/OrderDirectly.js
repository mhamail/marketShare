import React, { useState } from 'react'
//routing
import Router from 'next/router'
//component
import InputComponent from '../materialComponents/InputComponent'
//action
import { anonymousCodOrder } from '../../actions/order'
//style
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
//redux
import { deleteCart } from '../../redux/slices/cart/cartSlice'
import { useDispatch } from 'react-redux'

const OrderDirectly = ({ formData, cartItems }) => {
    const [values, setValues] = useState({
        name: "",
        phone: "",
        address: "",
        loading: false
    })
    const { name, phone, address } = values

    const dispatch = useDispatch();

    const handleChange = (event) => {
        const { name, value } = event.target;
        formData.set(name, value)
        setValues({ ...values, [name]: value })
    }

    const handleNumber = (event) => {
        const value = event.target.value;
        //regex
        var re = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;
        if (re.test(value) === false) {
            setValues({ ...values, phone: null })
            formData.set("phone", null)
        }
        else {
            setValues({ ...values, phone: Number(value) })
            formData.set("phone", value)
        }

    }
    const handleSubmit = (e) => {
        e.preventDefault();
        formData.set("items", JSON.stringify(cartItems))
        anonymousCodOrder(formData)
            .then(res => {
                console.log(res)
                if (res.data.ok) {
                    dispatch(deleteCart())
                    toast.success("Order Successfully Submitted")
                    Router.push('/shop')
                }
            })
            .catch(err => {
                toast.error(err.response.data.error)
            })
    }

    const OrderForm = () => {
        return (
            <form onSubmit={handleSubmit}>
                <InputComponent
                    type="text"
                    name="name"
                    placeholder="name"
                    onChange={handleChange}
                    value={name}
                />
                <div className='form-group mt-2'>
                    <div className='form-control'>
                        <input
                            type="tel"
                            value="+92"
                            size="3"
                            disabled
                        />
                        <input
                            type="tel"
                            value={phone || null}
                            maxLength="10"
                            placeholder="Enter your number"
                            onChange={handleNumber}
                        />
                    </div>
                </div>
                <div className="form-group mt-2">
                    <textarea
                        onChange={handleChange}
                        type="text"
                        name="address"
                        placeholder="enter full address. *street, *house. *city, *postal code "
                        value={address || ""}
                        className="form-control"
                    />
                </div>
                <button className='btn btn-dark btn-sm mt-2 container'>Submit</button>
            </form>
        )
    }
    return (
        <div>
            <ToastContainer />
            *note: we confirm the order before dispatch so your number should be On
            {OrderForm()}
        </div>
    )
}

export default OrderDirectly