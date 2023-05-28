import React, { useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { GoogleLogin } from 'react-google-login';
// import { gapi } from 'gapi-script';
import dynamic from 'next/dynamic';
const { gapi, loadClientAuth2 } = dynamic(() => import('gapi-script'), { ssr: false });
import { GOOGLE_APP_ID } from '../../config';
import { GoogleCircleFilled } from '@ant-design/icons';

// import { loadAuth2, loadAuth2WithProps, loadClientAuth2 } from 'gapi-script';

const LoginGoogle = () => {

    const clientId = GOOGLE_APP_ID
    useEffect(() => {

    }, [])

    const responseGoogle = (response) => {
        console.log(response)
    }


    return (
        <div>
            <ToastContainer />
            <GoogleLogin
                clientId={clientId}
                buttonText="Login with Google"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                render={renderProps => (
                    <div
                        onClick={renderProps.onClick}
                        disabled={renderProps.disabled}
                        style={{ cursor: "pointer" }}
                    >
                        <GoogleCircleFilled style={{ color: "red", fontSize: "2em" }} />
                    </div>
                )}
            />

        </div>
    )
}

export default LoginGoogle