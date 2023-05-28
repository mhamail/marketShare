import React, { useState, useEffect } from 'react'
import { withRouter } from 'next/router'
import dynamic from 'next/dynamic';
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import 'react-quill/dist/quill.snow.css'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
//components
import ModalSubmit from './components/ModalSubmit';
import FilesUpload from '../../../materialComponents/filesUpload/FilesUpload';
import InputComponent from '../../../materialComponents/InputComponent';
import { Quillmodules, Quillformats } from '../../../helpers/quill'
import { singleProduct } from '../../../../actions/product'
import SelectTree from './components/SelectTree';
//action
import { updateProduct } from '../../../../actions/product';
import { getCookie, isAuth, handleResponse } from '../../../../actions/auth';
// redux
import { fetchProduct } from '../../../../redux/slices/productSlice';
import { fetchListByUser } from '../../../../redux/slices/product/listByUserSlice';
import { useSelector, useDispatch } from 'react-redux'

const EditProduct = ({ router }) => {
    const dispatch = useDispatch();
    const [values, setValues] = useState({
        title: "",
        slug: "",
        highlight: "",
        description: "",
        price: null,
        category: "",
        images: [],
        shipping: undefined,
        color: undefined,
        brand: undefined,
        loading: false,
    })
    const [formData, setFormData] = useState()

    const products = useSelector((state) => state.product.data)

    const [modal, setModal] = useState(false);

    const { title, highlight, description, price, images, category,
        shipping, color, brand, loading
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
        setValues({ loading: true })
        const getProduct = products.find((product) => (
            product.slug === router.query.slug)
        )
        let category;
        if (getProduct) {
            category = getProduct.category && getProduct.category.name
            setValues({ ...values, ...getProduct, category: category })
        } else {
            initSingleProduct()
        }
    }, [router])
    //   console.log(values)        

    //init
    const initSingleProduct = () => {
        let category;
        singleProduct(router.query.slug)
            .then(res => {
                category = res.data.category && res.data.category.name
                setValues({ ...res.data, category: category, loading: false })
            })
            .catch(err => { console.log(err) })
    }

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
        formData.set('highlight', e);
        // if (typeof window !== 'undefined') {
        //     localStorage.setItem('description', JSON.stringify(e))
        // }
    }
    const handleImages = (data, name) => {
        name && formData.delete(`${[0]}name`)
        setValues({ ...values, images: data })
        data && data.length &&
            data.map((image, i) =>
                formData.set(`images${[i]}`, image)
            )
    }
    const deleteImages = (i) => {
        formData.delete(`images${[i]}`)
    }
    const clickSubmit = (event) => {
        event.preventDefault();
        setValues({ ...values, loading: true })
        updateProduct(formData, token, values.slug)
            .then(response => {
                setModal(!modal)
                toast.success("product is updated successfully")
                setValues({ ...values, loading: false, formData: new FormData() })
                dispatch(fetchProduct())
                dispatch(fetchListByUser({ userId }))
            })
            .catch(err => {
                toast.error(err.response.data.error)
                handleResponse(err.response)
            })

    }

    const createProductForm = () => {
        const titleStyle = {
            border: title.length > 160 ? "1px solid red" : ""
        }
        return (
            <form>
                <FilesUpload
                    imagez={handleImages}
                    imagezDelete={deleteImages}
                    editImages={images}
                />
                <div className="form-group mt-2">
                    * <label className='text-muted'>Category</label>
                    <SelectTree handleCategory={handleCategory} cateValue={category} />
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
                <div className="form-group mt-2 mb-2 " style={{ overflow: "hidden" }}>
                    *  <label>Highlight</label>
                    <ReactQuill
                        theme="snow"
                        value={highlight && highlight}
                        onChange={handleHighlight}
                        placeholder='type main points, use in points...'
                    />
                </div>
                <div className="form-group mt-5 mb-2">
                    * <label>Description</label>
                    <ReactQuill
                        theme="snow"
                        modules={Quillmodules}
                        formats={Quillformats}
                        value={description && description}
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
                            <option defaultValue="" selected>Select</option>
                        </select>
                    </div>
                    <div className="form-group mt-2 col-lg-4">
                        <label>Brand</label>
                        <select className="form-select">
                            <option defaultValue="" selected>Select</option>
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
                <div className="form-group mt-2">
                    <button
                        className='btn btn-dark mt-2 form-control'
                        onClick={clickSubmit}
                    >Submit
                    </button>
                </div>
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
                    title="Product Updated Successfully"
                    clickFunction={refreshPage}
                />
                :
                <div className="row">
                    {title && !loading && createProductForm()}
                </div>
            }
        </div>
    )
}

export default withRouter(EditProduct)