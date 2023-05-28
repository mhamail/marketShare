import React, { useState } from 'react'

import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import InputComponent from '../../../materialComponents/InputComponent'

//action
import { handleResponse,getCookie } from '../../../../actions/auth'
import { createCategory, listCategory, removeCategory } from '../../../../actions/category'

//redux
import { useSelector, useDispatch } from 'react-redux'
import { fetchCategories } from '../../../../redux/slices/categorySlice'
//component
// import DropdownCategory from './DropdownCategory'
import dynamic from 'next/dynamic';
const DropdownCategory = dynamic(() => import('./DropdownCategory'), { ssr: false });

const CategoryComponent = () => {
    const dispatch = (useDispatch())

    const [values, setValues] = useState({
        name: "",
        parentId: "",
        bossId:"",
        subCat: "",
    })

    const categories = useSelector((state) => state.category.data)


    const { name, parentId, subCat,bossId } = values;
    const token = getCookie('token')

    const handleEvent = (event) => {
        const { name, value } = event.target;
        setValues({ ...values, [name]: value })
    }

    const clickSubmit = e => {
        e.preventDefault();
        createCategory(name, parentId,bossId, token)
            .then(response => {
                toast.success("Category is created")
                setValues({ ...values, name: "",bossId:"", parentId: "" })
                dispatch(fetchCategories())

            })
            .catch(err => {
                handleResponse(err.response)
                toast.error(err.response.data.error)
            } )
    }
    // remove category function
    const removeCat = (id) => {
        let answer = window.confirm("Are you sure you want to delete this category?")
        if (answer) {
            removeCategory(id, token)
                .then(res => {
                    toast.success("category delete successfully ")
                    setValues({ ...values, name: "",bossId:"", parentId: ""  })
                    dispatch(fetchCategories())
                })
                .catch(err => {
                    handleResponse(err.response)
                    toast.error("something wrong")
                })
        }
    }
 
    const subMap = (sub, name) => {
        return sub.find((c) => (
            c.name === name ?
                c.name === name
                :
                c.sub &&
                    subMap(c.sub, name)
        ))
    }
    const clickCategory = (cat) => {
        const boss = categories.find(c => {
            return c.name === cat.name ?
                c.name === cat.name
                :
            c.sub &&
                subMap(c.sub,cat.name)
            })
        setValues({ ...values, subCat: cat.name, parentId: cat._id, bossId:boss._id })
    }
    const newCategory = () => {
        return <button
            className='btn btn-sm btn-dark'
            onClick={() => setValues({ ...values, parentId: "",bossId:"" })}>
            create new category
        </button>
    }
    // ---------- form
    const CategoryForm = () => {
        return (
            <div>
                <form>
                    <InputComponent
                        label={parentId ? subCat : "Name"}
                        type="text"
                        name='name'
                        value={name}
                        onChange={handleEvent}
                        required
                    />
                    <button onClick={clickSubmit} className='btn btn-dark mt-2'>
                        Create
                    </button>
                </form>
            </div>
        )
    }

    return (
        <div>
            <ToastContainer />
            <div className='row'>
                <div className="col-lg-6 pt-0 p-5">
                    {newCategory()}
                    <div>
                        <DropdownCategory
                            clickCategory={clickCategory}
                            removeCat={removeCat}
                        />
                    </div>
                </div>
                <div className="col-lg-6">
                    <div className='bg-secondary p-1'>
                        {parentId ? "sub-category" : "new category"}
                    </div>
                    {CategoryForm()}
                </div>

            </div>
        </div>
    )
}

export default CategoryComponent