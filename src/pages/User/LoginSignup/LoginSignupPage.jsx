import React, { useEffect } from 'react'
import LoginSignUp from './LoginSignUp'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { clearErrors } from '../../../redux/actions/userAction';

const LoginSignupPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { error, loading, isAuthenticated } = useSelector(
        (state) => state.user
    );

    useEffect(() => {
        if (isAuthenticated === true) {
            navigate("/profile");
        }
        if (error) {
            toast.error(error)
            dispatch(clearErrors()
            )

        }
    }, []);
    return (
        <div>
            <LoginSignUp />
        </div>
    )
}

export default LoginSignupPage
