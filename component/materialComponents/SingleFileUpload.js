import React from 'react'
import Resizer from "react-image-file-resizer";
import { updateUser } from '../../actions/user';
import { getCookie } from '../../actions/auth';

const SingleFileUpload = ({getPhoto,formData}) => {
    formData=new FormData()
    const token=getCookie("token")

    const handlePhoto = (event) => {
        const file = event.target.files[0]
        Resizer.imageFileResizer(
            file,
            720,
            720,
            "JPEG",
            90,
            0,
            (uri) => {
                formData.set("photo", uri)
                updateUser(formData, token)
                    .then(res => {
                        getPhoto(res.data.photo )
                    })
                    .catch(err => console.log(err))
            },
            "base64"
        )
    }
    return (
        <div className="form-group mt-1">
            <label className='btn btn-dark'>
                Profile Photo
                <input
                    onChange={handlePhoto}
                    type="file"
                    accept='image/*'
                    hidden
                />
            </label>
        </div>
    )
}

export default SingleFileUpload