import React, { useState, useEffect } from 'react'
//redux
import { useSelector,useDispatch } from 'react-redux'
import { fetchUser } from '../../redux/slices/user/userSlice'
//action
import { getCookie } from '../../actions/auth'
import { updateUser } from '../../actions/user'

const EditAddress = ({toast}) => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.user.data)
    const [address, setAddress] = useState(user.address)
    const [edit, setEdit] = useState(false)
    const [formData, setFormData] = useState()

    const token = getCookie('token');

    useEffect(() => {
        setFormData(new FormData())
    }, [])

    const handleChange = (event) => {
        setAddress(event.target.value)
        formData.set("address",event.target.value)
    }

    const update = () => {
        !address ? toast.error("address should not be empty") :
        updateUser(formData, token)
        .then(res => {
            toast.success("address is updated")
            dispatch(fetchUser())
        })
        .catch(err => { toast.error("address is not updated")})
    }

    const userAddress = () => {
        return <div>
            <h4>Delivery Address</h4>
            <div className="form-group">
                <label
                    className="text-muted">
                    Address
                </label>
                {!edit && user.address ?
                    <div
                        style={{ border: "1px solid grey", padding: "10px" }}
                    >
                        {user.address}
                    </div>
                    :
                    <textarea
                        onChange={handleChange}
                        type="text"
                        name="address"
                        placeholder="address is required"
                        value={address}
                        className="form-control textArea"
                    />
                }
                <button className='btn btn-sm btn-dark'
                    onClick={() => setEdit(!edit)}
                > {!edit && user.address ? "Edit" :
                <span onClick={update}>Update</span>
                }
                </button>
            </div>
        </div>
    }

    return (
        <div>
            {userAddress()}
        </div>
    )
}

export default EditAddress