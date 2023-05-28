import React, { useState, useEffect } from 'react'
//style
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
//material component
import SearchComponent from '../../materialComponents/SearchComponent'
//action
import { deleteUser } from '../../../actions/user'
import { getCookie } from '../../../actions/auth'
//redux
import { useSelector, useDispatch } from 'react-redux'
import { fetchAllUser } from '../../../redux/slices/user/allUserSlice'
//function
import { resetPassword, clickSearch, handleChange,removeUser } from './function'

const AllUserComponent = () => {
    const dispatch = useDispatch()
    const users = useSelector(state => state.allUser.data)
    const [keyword, setKeyword] = useState("")
    const [toggle, setToggle] = useState(false)
    const [searchList, setSearchList] = useState([])
    const [formData, setFormData] = useState("")

    useEffect(() => {
        setFormData(new FormData())
    }, [])

    const searchUser = () => (
        <SearchComponent
            keyword={keyword}
            setKeyword={setKeyword}
            placeholder={!toggle ?
                "search users by name or username" :
                "search users by number"
            }
            onClick={() => clickSearch(keyword, toggle, setSearchList)}
        />
    )

    const image = "../../images/logo.png"
    const userCard = (users) => {
        return users && users.length && users.map((user) => (
            <div className='col-lg-4 mt-2 col-6' key={user._id}>
                <div className="d-inline-block mt-0 m-3">
                    <div className="p-3">
                        <div className="all-user-box">
                            <div className="img-container">
                                <div className="img-inner">
                                    <div className="inner-skew">
                                        <img src={user.image ? user.image : image} alt="mhmarket-logo" />
                                    </div>
                                </div>
                            </div>
                            <div className="text-container">
                                <div className='d-flex justify-content-between'>
                                    <h3>{user.name}</h3>
                                    <span>{user.phone}</span>
                                </div>
                                <div>
                                    {user.address && user.address}
                                </div>
                                <div className='d-flex justify-content-between mt-2 align-items-center'>
                                    <div className='d-flex align-items-center'>
                                        <h6>role : </h6>
                                        &nbsp;
                                        <div className="form-group">
                                            <select
                                                className="form-select"
                                                value={user.role}
                                                onChange={handleChange(user.username, formData, dispatch)}
                                            >
                                                {/* <option value="" selected>Select</option> */}
                                                <option value="1">admin</option>
                                                <option value="0">user</option>
                                            </select>
                                        </div>
                                    </div>
                                    <button
                                        className='btn btn-sm btn-danger'
                                        onClick={()=>removeUser(user.username,dispatch)}
                                    >
                                        del
                                    </button>
                                </div>
                                <div className='mt-2'>
                                    <button
                                        className='btn btn-sm btn-danger'
                                        onClick={() => resetPassword(user.username, formData, dispatch)}
                                    >
                                        reset password
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        ))
    }
    return (
        <div className='row'>
            <ToastContainer />
            <button className='btn btn-sm btn-light col-3'
                onClick={() => setToggle(!toggle)}
            >
                {!toggle ? "click to search with number" : "click to search with name"}
            </button>
            <div className="col-lg-12">
                {searchUser()}
            </div>

            {searchList.length > 0 &&
                <div className="row gx-2">
                    <div className="col-12 mt-3">
                        <h6 className='d-inline-block bg-dark text-light p-2'>Search User List</h6>
                    </div>
                    {userCard(searchList)}
                    <hr />
                </div>
            }
            <div className="row gx-2">
                {userCard(users)}
            </div>
        </div>
    )
}

export default AllUserComponent