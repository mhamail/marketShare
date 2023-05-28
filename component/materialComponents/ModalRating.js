import React, { useState } from 'react'
import { Modal } from 'antd';
import { StarOutlined } from '@ant-design/icons';
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useRouter } from 'next/router'
import { isAuth } from '../../actions/auth';


const ModalRating = ({ children }) => {
    const router = useRouter()
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleModal = () => {
        isAuth() ?
            setIsModalOpen(true)
            :
            router.push({
                pathname: "/auth/signin",
                query: { from: `/shop/${router.query.slug}` }
            })
    };

    const handleOk = () => {
        setIsModalOpen(false);
        toast.success("Thanks for your review. It will appear soon")

    };

    const handleCancel = () => {
        setIsModalOpen(false);
    }
    return (
        <>
            <ToastContainer />
            <div onClick={handleModal}
                style={{ cursor: "pointer", textAlign: "center" }}>
                <StarOutlined className='text-danger fs-4' />
                <br />{" "}
                <span className='text-muted'>
                    {isAuth() ? "Leave rating" : "Login to leave rating"}
                </span>
            </div>
            <Modal
                title="Leave your Rating"
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}>
                {children}
            </Modal>
     
        </>
    )
}

export default ModalRating