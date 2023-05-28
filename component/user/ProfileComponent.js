import React, { useState, useEffect } from 'react'
import { withRouter } from 'next/router';
//style
import styles from './user.module.scss'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
//material
import InputComponent from '../materialComponents/InputComponent'
import { CircleLoading } from '../materialComponents/CircleLoading';
import SingleFileUpload from '../materialComponents/SingleFileUpload';
//action
import { getCookie } from '../../actions/auth'
import { updateUser } from '../../actions/user'
//redux
import { useSelector, useDispatch } from 'react-redux';
import { fetchUser } from '../../redux/slices/user/userSlice';

const ProfileComponent = ({ router }) => {
    const user = useSelector(state => state.user.data)
    const dispatch = useDispatch()
    const [values, setValues] = useState({
        _id: "",
        username: user.username,
        name: user.name,
        photo: user.photo,
        phone: user.phone,
        password: "",
        address: user.address,
        loading: false
    })

    const [formData, setFormData] = useState()

    const { username, name, password, phone, address, photo, loading } = values;

    const token = getCookie('token')

    useEffect(() => {
        setFormData(new FormData())
        setValues({ ...values, ...user })
    }, [user])

    const handleChange = (event) => {
        const { name, value } = event.target;
        formData.set(name, value);
        setValues({ ...values, [name]: value })
    }

    const settingPhoto = (photo) => {
        setValues({ ...values, photo })
        dispatch(fetchUser())
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
        e.preventDefault()
        updateUser(formData, token)
            .then(res => {
                setValues({ ...values, ...res.data, password: "" })
                dispatch(fetchUser())
                toast.success("profile update successfully")
            })
            .catch(err => console.log(err))
    }
    const ProfileForm = () => {
        return (
            <form>
                <div
                    className={`${styles.image} `}>
                    <img src={photo} className="img-fluid" />
                </div>
                <SingleFileUpload
                    getPhoto={settingPhoto}
                    formData={formData}
                />
                <InputComponent
                    label="Name"
                    type="text"
                    name="name"
                    value={name || ""}
                    onChange={handleChange}
                    placeholder="name"
                />
                <InputComponent
                    label="Username"
                    type="text"
                    placeholder="Type your username"
                    name="username"
                    value={username || ""}
                    onChange={handleChange}
                    disabled
                />
                <div className='form-group mt-2'>
                    <label className='text-muted'>Phone Number</label>
                    <div className='form-control'>
                        <input
                            type="tel"
                            value="+92"
                            size="3"
                            disabled
                        />
                        <input
                            type="tel"
                            value={phone || ""}
                            maxLength="10"
                            placeholder="Enter your number"
                            onChange={handleNumber}
                        />
                    </div>
                </div>
                <div className="form-group mt-2">
                    <label
                        className="text-muted">
                        Address
                    </label>
                    <textarea
                        onChange={handleChange}
                        type="text"
                        name="address"
                        placeholder="enter full address. *street, *house. *city, *postal code "
                        value={address || ""}
                        className="form-control"
                    />
                </div>
                <InputComponent
                    label="Password"
                    type="password"
                    name="password"
                    value={password || ""}
                    onChange={handleChange}
                    placeholder="update password"
                />
                <button onClick={handleSubmit} className='btn btn-dark mt-2'>update</button>
            </form>
        )
    }
    const showLoading = () => {
        return loading && CircleLoading()
    }
    return (
        <div className='mb-5'>
            <ToastContainer />
            {showLoading()}
            <div style={loading ? { opacity: 0.3 } : {}}>
                {ProfileForm()}
            </div>
        </div>
    )
}

export default withRouter(ProfileComponent)