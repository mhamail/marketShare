import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Router from 'next/router';
import { useRouter } from 'next/router'
import Link from 'next/link';
//action
import { authenticate, isAuth, signin } from '../../actions/auth';
//components
import InputComponent from '../materialComponents/InputComponent'
import LoginGoogle from './GoogleLogin';
//redux
import { fetchUser } from '../../redux/slices/user/userSlice';
import { useDispatch } from 'react-redux';

const SigninComponent = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [values, setValues] = useState({
    phone: "",
    password: "",
    loading: false
  })
  const { phone, password, loading } = values

  const handleEvent = (event) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value, loading: false })
  }
  const handleNumber = (event) => {
    const value = event.target.value;
    //regex
    var re = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;
    if (re.test(value) === false) {
        setValues({ ...values, phone: null })
    }
    else {
        setValues({ ...values, phone: Number(value) })
    }

}

  const handleSubmit = (event) => {
    event.preventDefault()
    let intended = router.query.from
    setValues({ ...values, loading: true })
    const user = {phone, password };
    signin(user)
      .then(response => {
        toast.success(response.data.message)
        authenticate(response.data, () => {
          dispatch(fetchUser(response.data.token))
          if (intended) {
            router.push(intended)
          }
          else {
            if (isAuth() && isAuth().role === 1) {
              Router.push('/admin');
            }
            else {
              Router.push('/user');
            }
          }
        })
      })
      .catch(err => {
        toast.error(err.response.data.error)
        setValues({ ...values, loading: false })
      })
  }

  const showLoading = () => {
    return loading ?
      <div className="alert alert-info">Loading...</div>
      : ''
  }
  const signinForm = () => (
    <form onSubmit={handleSubmit}>

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
            maxLength="10"
            value={phone}
            placeholder="Enter your number"
            onChange={handleNumber}
          />
        </div>
      </div>
      <InputComponent
        label="Password"
        type="password"
        placeholder="Type Your Password"
        name="password"
        value={password}
        onChange={handleEvent}
      />
      <div className='d-flex justify-content-between mt-2'>
        <div className='d-flex'>
          <button className='btn btn-dark'>Signin</button>
          {/* <div className='ms-2 d-flex'>
            or Signin with &nbsp;<LoginGoogle />
          </div> */}
        </div>
        <Link href="/auth/password/forgot">
          <a style={{ color: "black", textDecoration: "underline" }}>
            Forgot password
          </a>
        </Link>
      </div>
    </form>
  )
   isAuth() && Router.push('/'); 
  return (
    <div>
      <ToastContainer />
      {showLoading()}
      {signinForm()}
    </div>
  )
}

export default SigninComponent