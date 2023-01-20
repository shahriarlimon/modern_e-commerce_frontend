import React, { Fragment, useRef, useState, useEffect } from "react";
import "./UpdateProfile.css";
import { useLocation, useNavigate } from "react-router-dom";
import { FiMail } from 'react-icons/fi'
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/overlays/Loader/Loader";
import { FaRegUser } from 'react-icons/fa';
import { clearErrors, loadUser, login, updateProfile } from "../../redux/actions/userAction";
import { toast } from 'react-toastify';
import { UPDATE_PROFILE_RESET } from "../../redux/actionTypes/userActionTypes";
import MetaData from "../../components/overlays/MetaData/MetaData";

const UpdateProfile = () => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [avatar, setAvatar] = useState("/Profile.png");
    const [avatarPreview, setAvatarPreview] = useState("/Profile.png");

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    let from = location?.state?.from?.pathname || "/profile";
    const { user } = useSelector(
        (state) => state.user
    );
    const { error, isUpdated, loading } = useSelector((state) => state.profile)
    const updateProfileSubmit = (e) => {
        e.preventDefault();
        const name = document.getElementsByName("name")[0].value;
        const email = document.getElementsByName("email")[0].value;
        const user = {
            name, email, avatar
        }
        dispatch(updateProfile(user))
    };

    const updateProfileDataChange = (e) => {
        const reader = new FileReader();

        reader.onload = () => {
            if (reader.readyState === 2) {
                setAvatarPreview(reader.result);
                setAvatar(reader.result);
            }
        };
        reader.readAsDataURL(e.target.files[0]);
    };




    useEffect(() => {

        if (user) {
            setName(user.name)
            setEmail(user.email)
            setAvatarPreview(user.avatar.url)
        }
        if (isUpdated) {
            toast.success("User updated successfully")
            dispatch(loadUser())
            dispatch({ type: UPDATE_PROFILE_RESET })


        }
        if (error) {
            toast.error(error)
            dispatch(clearErrors()
            )

        }
    }, [user, error, isUpdated, dispatch, navigate, from]);

    return (
        <Fragment>
            {loading ? (
                <Loader />
            ) : (
                <Fragment>
                    <MetaData title="Update Profile" />
                    <div className="updateProfileContainer">
                        <div className="updateProfileBox">
                            <h2 className="updateProfileHeading">Update Profile</h2>

                            <form
                                className="updateProfileForm"
                                encType="multipart/form-data"
                                onSubmit={updateProfileSubmit}
                            >
                                <div className="updateProfileName">
                                    <FaRegUser />
                                    <input
                                        type="text"
                                        placeholder="Name"
                                        required
                                        name="name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </div>
                                <div className="updateProfileEmail">
                                    <FiMail />
                                    <input
                                        type="email"
                                        placeholder="Email"
                                        required
                                        name="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>

                                <div id="updateProfileImage">
                                    <img src={avatarPreview} alt="Avatar Preview" />
                                    <input
                                        type="file"
                                        name="avatar"
                                        accept="image/*"
                                        onChange={updateProfileDataChange}
                                    />
                                </div>
                                <input
                                    type="submit"
                                    value="Update"
                                    className="updateProfileBtn"
                                />
                            </form>
                        </div>
                    </div>
                </Fragment>
            )}
        </Fragment>
    );
};

export default UpdateProfile;