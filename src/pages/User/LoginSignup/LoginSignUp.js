import React, { Fragment, useRef, useState, useEffect } from "react";
import "./LoginSignUp.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FiMail } from 'react-icons/fi'
/* import LockOpenIcon from "@material-ui/icons/LockOpen" */;
import { BiLockOpenAlt } from 'react-icons/bi'
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../../components/overlays/Loader/Loader";
import { FaRegUser } from 'react-icons/fa';
import { clearErrors, loadUser, login, register } from "../../../redux/actions/userAction";
import { toast } from 'react-toastify';
import axios from "axios";
import { server } from "../../../redux/store";

const LoginSignUp = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { error, loading, isAuthenticated } = useSelector(
        (state) => state.user
    );

    const loginTab = useRef(null);
    const registerTab = useRef(null);
    const switcherTab = useRef(null);

    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");

    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
    });

    const { name, email, password } = user;

    const [avatar, setAvatar] = useState("/Profile.png");
    const [avatarPreview, setAvatarPreview] = useState("/Profile.png");

    const loginSubmit = async (e) => {
        e.preventDefault();
        await axios.post(`${server}/user/login`, { loginEmail, loginPassword }, {
            withCredentials: true
        }).then((res) => {
            if (res.data.success === true) {
                toast.success("Login Success!")
                navigate("/profile")
                window.location.reload(true)

            }
        }).catch((error) => {
            toast.error(error?.response?.data.message)
        })


    };

    const registerSubmit = async (e) => {
        e.preventDefault();
        const user = {
            name, email, password, avatar
        }
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            withCredentials: true
        }

        await axios.post(`${server}/user/register`, user, config).then((res) => {
            toast.success("user created successfully!")
            navigate("/profile")
            window.location.reload(true)
        }).catch((error) => {
            toast.error(error.response.data.message)
        })

    };

    const registerDataChange = (e) => {
        if (e.target.name === "avatar") {
            const reader = new FileReader();

            reader.onload = () => {
                if (reader.readyState === 2) {
                    setAvatarPreview(reader.result);
                    setAvatar(reader.result);
                }
            };
            reader.readAsDataURL(e.target.files[0]);

        } else {
            setUser({ ...user, [e.target.name]: e.target.value });
        }
    };





    const switchTabs = (e, tab) => {
        if (tab === "login") {
            switcherTab.current.classList.add("shiftToNeutral");
            switcherTab.current.classList.remove("shiftToRight");

            registerTab.current.classList.remove("shiftToNeutralForm");
            loginTab.current.classList.remove("shiftToLeft");
        }
        if (tab === "register") {
            switcherTab.current.classList.add("shiftToRight");
            switcherTab.current.classList.remove("shiftToNeutral");

            registerTab.current.classList.add("shiftToNeutralForm");
            loginTab.current.classList.add("shiftToLeft");
        }
    };

    return (
        <Fragment>
            {loading ? (
                <Loader />
            ) : (
                <Fragment>
                    <div className="LoginSignUpContainer">
                        <div className="LoginSignUpBox">
                            <div>
                                <div className="login_signUp_toggle">
                                    <p onClick={(e) => switchTabs(e, "login")}>LOGIN</p>
                                    <p onClick={(e) => switchTabs(e, "register")}>REGISTER</p>
                                </div>
                                <button ref={switcherTab}></button>
                            </div>
                            <form className="loginForm" ref={loginTab} onSubmit={loginSubmit}>
                                <div className="loginEmail">
                                    <FiMail />
                                    <input
                                        type="email"
                                        placeholder="Email"
                                        required
                                        value={loginEmail}
                                        onChange={(e) => setLoginEmail(e.target.value)}
                                    />
                                </div>
                                <div className="loginPassword">
                                    <BiLockOpenAlt />
                                    <input
                                        type="password"
                                        placeholder="Password"
                                        required
                                        value={loginPassword}
                                        onChange={(e) => setLoginPassword(e.target.value)}
                                    />
                                </div>
                                <Link to="/password/forgot">Forget Password ?</Link>
                                <input type="submit" value="Login" className="loginBtn" />
                            </form>
                            <form
                                className="signUpForm"
                                ref={registerTab}
                                encType="multipart/form-data"
                                onSubmit={registerSubmit}
                            >
                                <div className="signUpName">
                                    <FaRegUser />
                                    <input
                                        type="text"
                                        placeholder="Name"
                                        required
                                        name="name"
                                        value={name}
                                        onChange={registerDataChange}
                                    />
                                </div>
                                <div className="signUpEmail">
                                    <FiMail />
                                    <input
                                        type="email"
                                        placeholder="Email"
                                        required
                                        name="email"
                                        value={email}
                                        onChange={registerDataChange}
                                    />
                                </div>
                                <div className="signUpPassword">
                                    <BiLockOpenAlt />
                                    <input
                                        type="password"
                                        placeholder="Password"
                                        required
                                        name="password"
                                        value={password}
                                        onChange={registerDataChange}
                                    />
                                </div>

                                <div id="registerImage">
                                    <img src={avatarPreview} alt="Avatar Preview" />
                                    <input
                                        required={true}
                                        type="file"
                                        name="avatar"
                                        accept=".jpg,.jpeg,.png"
                                        onChange={registerDataChange}
                                    />
                                </div>
                                <input type="submit" value="Register" className="signUpBtn" />
                            </form>
                        </div>
                    </div>
                </Fragment>
            )}
        </Fragment>
    );
};

export default LoginSignUp;