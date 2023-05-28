import React, { useState, useEffect } from 'react'
// style
import styles from '../product.module.scss'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
//icon
import { EditFilled, UploadOutlined } from '@ant-design/icons';
//action
import { getCookie } from '../../../../../actions/auth';
import { updateProduct } from '../../../../../actions/product';
//redux
import { useDispatch } from 'react-redux'
import { fetchProduct } from '../../../../../redux/slices/productSlice';

const EditPrice = ({ price, _id, slug }) => {
    const dispatch = useDispatch()
    const [values, setValues] = useState({
        editPrice: "",
        formData: null
    })

    let { editPrice, formData } = values

    const token = getCookie('token')

    useEffect(() => {
        if (typeof window !== "undefined") {
            setValues({ editPrice: "", formData: new FormData() })
        }
    }, [dispatch])




    if (typeof window !== "undefined") {
        window.onclick = (event) => {
            const name = event.target.className
            if (name.animVal !== "" && name !== "windowEdit") {
                setValues({ ...values, editPrice: "" })
            }
        }
    }

    const handleEvent = (event) => {
        const { name, value } = event.target;
        let convertPrice = Number(value)
        formData.set(name, convertPrice)
        setValues({ ...values, [name]: value })
    }

    const updatePrice = () => {
        updateProduct(formData, token, slug)
            .then(response => {
                setValues({ editPrice: "", formData: new FormData() })
                toast.success("product update successfully")
                dispatch(fetchProduct(10))
            })
            .catch(err => {
                toast.error(err.response.data.error)
                handleResponse(err.response)
            })
    }
    //td component
    const editPricetd = () => {
        return editPrice !== _id ? (
            <div>
                <span onClick={() => setValues({ ...values, editPrice: _id })}>
                    <a className={`${styles.edit}`}>
                        <EditFilled className={`me-2 ${styles.edit}`} />
                    </a>
                </span>
                {price}.00
            </div>
        )
            :
            (
                <div>
                    <span onClick={() => updatePrice()}>
                        <a className={`${styles.edit}`}>
                            <UploadOutlined className={`me-2 ${styles.edit}`} />
                        </a>
                    </span>
                    <input
                        className='windowEdit'
                        type="number"
                        min="1"
                        max="9000"
                        name="price"
                        defaultValue={price}
                        onChange={handleEvent}
                    />
                </div>
            )
    }
    return (
        <>
            <ToastContainer />
            {editPricetd()}
        </>
    )

}

export default EditPrice