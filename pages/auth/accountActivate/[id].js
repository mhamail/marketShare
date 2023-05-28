import React, { useState, useEffect } from 'react'
import { withRouter } from 'next/router'
import jwt from 'jsonwebtoken'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import Layout from '../../../component/Layout'
import { signup } from '../../../actions/auth'

const ActivateAccount = ({ router }) => {
    const [values, setValues] = useState({
        name: "",
        token: "",
        loading: false,
        showButton: true
    })
    const { name, token, loading, showButton } = values;

    useEffect(() => {
        let token = router.query.id;
        if (token) {
            const { username } = jwt.decode(token);
            setValues({ ...values, name, token })
        }
    }, [router])

    const handleSubmit = (e) => {
        e.preventDefault();
        setValues({ ...values, loading: true })
        signup({ token })
            .then(response => {
                setValues({ ...values, loading: false, showButton: false })
                toast.success(response.data.message)
            })
            .catch(err => {
                setValues({ ...values, loading: false, showButton: false })
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

    return (
        <Layout>
            <div className="container mt-5 p-5">
                <ToastContainer />
                <h3 className='pb-4'>
                    Hey {name}, Ready to activate your account?
                </h3>
                {showLoading()}
                {showButton && (
                    <button className="btn btn-dark"
                        onClick={handleSubmit}>
                        Activate Account
                    </button>
                )}
            </div>
        </Layout>
    )
}

export default withRouter(ActivateAccount)