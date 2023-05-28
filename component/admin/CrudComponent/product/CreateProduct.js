import React, { useState, useEffect } from 'react'
import { withRouter } from 'next/router'
import dynamic from 'next/dynamic';
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import 'react-quill/dist/quill.snow.css'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
//component
import ModalSubmit from './components/ModalSubmit';
import FilesUpload from '../../../materialComponents/filesUpload/FilesUpload';
import InputComponent from '../../../materialComponents/InputComponent';
import { Quillmodules, Quillformats } from '../../../helpers/quill'
import SelectTree from './components/SelectTree';
//action
import { createProduct } from '../../../../actions/product';
import { getCookie, isAuth, handleResponse } from '../../../../actions/auth';
//redux
import { fetchProduct } from '../../../../redux/slices/productSlice';
import { fetchListByUser } from '../../../../redux/slices/product/listByUserSlice';
import { useDispatch, useSelector } from 'react-redux'

const CreateProduct = ({ router }) => {
    const dispatch = useDispatch();
    const [values, setValues] = useState({
        title: "",
        highlight: "",
        description: "",
        price: null,
        category: "",
        subcategory: "",
        images: [],
        shipping: undefined,
        color: undefined,
        brand: undefined,
        loading: false,
    })
    const [formData, setFormData] = useState()

    const categories = useSelector((state) => state.category.data)
    // const subcategories = useSelector((state) => state.subcategory.data)

    const [modal, setModal] = useState(false);

    const { title, highlight, description, price,
        shipping, category, color, brand,
        loading
    } = values;

    if (shipping == "" || color == "" || brand == "") {
        setValues({
            ...values,
            shipping: undefined,
            color: undefined,
            brand: undefined
        })
    }
    useEffect(() => {
        setFormData(new FormData());
    }, [router])

    const token = getCookie('token')
    const userId = isAuth() && isAuth()._id

    //handleEvents
    const handleEvent = (event) => {
        const { name, value } = event.target
        formData.set(name, value)
        setValues({ ...values, [name]: value })
    }

    const handleEventNumber = (event) => {
        let convertPrice = Number(event.target.value)
        setValues({ ...values, price: convertPrice })
        formData.set("price", convertPrice)
    }

    const handleCategory = (value) => {
        setValues({ ...values, category: value })
        formData.set("category", value)
    }

    const handleDescription = (e) => {
        setValues({ ...values, description: e })
        formData.set("description", e)
        // if (typeof window !== 'undefined') {
        //     localStorage.setItem('description', JSON.stringify(e))
        // }
    }

    const handleHighlight = (e) => {
        setValues({ ...values, highlight: e })
        formData.set("highlight", e)
    }
    const handleImages = (data, name) => {
        name && formData.delete(`${[0]}name`)
        data && data.length &&
            data.map((image, i) =>
                formData.set(`images${[i]}`, image)
            )
    }
    const deleteImages = (i) => {
        formData.delete(`images${[i]}`)
    }

    const clickSubmit = (event) => {
        setValues({ ...values, loading: true })
        event.preventDefault()
        createProduct(formData, token)
            .then(response => {
                setModal(!modal);
                toast.success("product is created")
                setValues({ ...values, loading: false })
                dispatch(fetchProduct())
                dispatch(fetchListByUser({ userId }))
            })
            .catch(err => {
                toast.error(err.response.data.error)
                setValues({ ...values, loading: false })
                handleResponse(err.response)
            })

    }
    const titleStyle = {
        border: title.length > 160 ? "1px solid red" : ""
    }

    const createProductForm = () => {
        return (
            <form>
                <FilesUpload imagez={handleImages} imagezDelete={deleteImages} />
                <div className="form-group mt-2">
                    * <label className='text-muted'>Category</label>
                    <SelectTree handleCategory={handleCategory} />
                </div>

                <InputComponent
                    text={`character ${title.length}/160`}
                    style={titleStyle}
                    sign="*"
                    label="Title"
                    type="text"
                    name="title"
                    value={title}
                    onChange={handleEvent}
                    placeholder="limit 160 character"
                />
                <div className="form-group mt-2 mb-2 ">
                    *  <label>Highlight</label>
                    <ReactQuill
                        theme="snow"
                        value={highlight}
                        onChange={handleHighlight}
                        placeholder='type main points, use in points...'
                    />
                </div>
                <div className="form-group mt-5 mb-2">
                    * <label>Description</label>
                    <ReactQuill
                        modules={Quillmodules}
                        formats={Quillformats}
                        theme="snow"
                        value={description}
                        onChange={handleDescription}
                        placeholder='product description...'
                    />
                </div>
                <div className='row justify-content-between'>
                    {/* shipping */}
                    <div className="form-group mt-2 col-lg-4">
                        * <label>Shipping</label>
                        <select
                            name="shipping"
                            className="form-select"
                            value={shipping}
                            onChange={handleEvent}
                        >
                            <option value="" selected>Select</option>
                            <option>Yes</option>
                            <option>No</option>
                        </select>
                    </div>
                    <div className="form-group mt-2 col-lg-4">
                        <label>Color</label>
                        <select className="form-select">
                            <option value="" selected>Select</option>
                        </select>
                    </div>
                    <div className="form-group mt-2 col-lg-4">
                        <label>Brand</label>
                        <select className="form-select">
                            <option value="" selected>Select</option>
                        </select>
                    </div>
                </div>
                <InputComponent
                    sign="*"
                    label="Price"
                    placeholder="enter price"
                    type="number"
                    name="price"
                    value={price}
                    onChange={handleEventNumber}
                />
                {!loading &&
                    <div className="form-group mt-2">
                        <button
                            className='btn btn-dark mt-2 form-control'
                            onClick={clickSubmit}
                        >Submit
                        </button>
                    </div>
                }
            </form >
        )
    }

    const showLoading = () => {
        return loading ?
            <div className='SpinnerOverlays '>
                <div className="SpinnerContainers"></div>
            </div>
            : ''
    }

    // modal
    const refreshPage = (data) => {
        setValues({ ...values, ...data })
        setModal(false)
        setFormData(new FormData());
    }

    return (
        <div className='container-fluid pb-5 mt-2'>
            <ToastContainer />
            {showLoading()}
            {modal ?
                <ModalSubmit
                    title="Product Successfully Submit"
                    clickFunction={refreshPage}
                />
                :
                <div className="row">
                    {createProductForm()}
                </div>
            }
        </div>
    )
}

export default withRouter(CreateProduct)