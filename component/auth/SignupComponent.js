import React, { useState } from 'react'
import { withRouter } from 'next/router'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import InputComponent from '../materialComponents/InputComponent'
import { signup } from '../../actions/auth'

const SignupComponent = ({ router }) => {
    const [values, setValues] = useState({
        name: "",
        username: "",
        phone: "",
        password: "",
        loading: false
    })
    const [isError, setIsError] = useState(false);
    const { name, username, phone, password, loading } = values

    const handleEvent = (event) => {
        const { name, value } = event.target;
        setValues({ ...values, [name]: value, loading: false })
    }
    const handleNumber = (event) => {
        const value = event.target.value;
        //regex
        var re = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;
        if (re.test(value) === false) {
            setIsError(true);
            setValues({ ...values, phone: null })
        }
        else {
            setIsError(false);
            setValues({ ...values, phone: Number(value) })
        }
    }
    const handleSubmit = (event) => {
        event.preventDefault()
        // setValues({ ...values, loading: true })
        const user = { name, username, phone, password }
        signup(user)
            .then(response => {
                setValues({ ...values, name: "", username: "", password: "", phone: null, loading: false })
                toast.success(response.data.message)
                setTimeout(() => { router.push("/auth/signin") }, [2000])

            })
            .catch(err => {
                setValues({ ...values, password: "", loading: false })
                toast.error(err.response.data.error)
            })
    }
    const showLoading = () => {
        return loading ?
            <div className='SpinnerOverlays '>
                <div className="SpinnerContainers"></div>
            </div>
            : ''
    }

    const signupForm = () => (

        <form onSubmit={handleSubmit}
            style={loading ? { opacity: 0.5 } : {}}
        >
            <InputComponent
                label="Name"
                type="text"
                placeholder="Type Your Name"
                name="name"
                value={name}
                onChange={handleEvent}
            />
            <InputComponent
                label="Username"
                type="text"
                placeholder="Type your username"
                name="username"
                value={username}
                onChange={handleEvent}
            />
            {/* <InputComponent
                        label="Email"
                        type="text"
                        placeholder="Type Your Email"
                        name="email"
                        value={email}
                        onChange={handleEvent}
                    /> */}

            <div className='form-group mt-2'>
                <label className='text-muted'>Enter Phone Number</label>
                <div className='form-control'>
                    <input
                        style={{ border: phone ? "1px solid green" : "1px solid red" }}
                        type="tel"
                        value="+92"
                        size="3"
                        disabled
                    />
                    <input
                        style={{ border: phone ? "1px solid green" : "1px solid red" }}
                        type="tel"
                        maxLength="10"
                        values={phone}
                        placeholder="number should be unique"
                        onChange={handleNumber}
                    />
                </div>
            </div>
            {/* <div className='form-group mt-2'>
                        <label className='text-muted'>Enter phone number</label>
                        <TextField
                            className='form-control'
                            type="tel"
                            size="small"
                            error={isError}
                            value={phone}
                            onChange={handleNumber}
                            InputProps={{
                                startAdornment: <InputAdornment position="start">
                                    +92
                                </InputAdornment>,
                            }}
                        />
                    </div> */}
            <InputComponent
                label="Password"
                type="password"
                placeholder="Type Your Password"
                name="password"
                value={password}
                onChange={handleEvent}
            />
            <div>
                <button className='btn btn-dark mt-2'>Signup</button>
            </div>
        </form>
    )
    return (
        <div>
            <ToastContainer />
            {showLoading()}
            {signupForm()}
        </div>
    )
}

export default withRouter(SignupComponent)