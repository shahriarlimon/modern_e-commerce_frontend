import React, { Fragment, useState, useEffect } from "react";
import "./UpdatePassword.css";
import { useDispatch, useSelector } from "react-redux";
import { BiLockOpenAlt } from 'react-icons/bi'
import { MdVpnKey } from 'react-icons/md';
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { clearErrors, updatePassword } from "../../redux/actions/userAction";
import MetaData from "../../components/overlays/MetaData/MetaData";
import Loader from "../../components/overlays/Loader/Loader";
import { UPDATE_PASSWORD_RESET } from "../../redux/actionTypes/userActionTypes";

const UpdatePassword = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const { error, isUpdated, loading } = useSelector((state) => state.profile);

    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const updatePasswordSubmit = (e) => {
        e.preventDefault();
       /*  const oldPassword = document.getElementsByName("oldPassword")[0].value;
        const newPassword = document.getElementsByName("newPassword")[0].value;
        const confirmPassword = document.getElementsByName("confirmPassword")[0].value; */
        const user = {
            oldPassword, newPassword, confirmPassword
        }
        dispatch(updatePassword(user))

    };

    useEffect(() => {

        if (isUpdated) {
            toast.success("Password Updated Successfully");
            navigate("/profile")
            dispatch({
                type: UPDATE_PASSWORD_RESET,
            });
        }

        if (error) {
            toast.error(error)
            dispatch(clearErrors())
        }



    }, [isUpdated, navigate, dispatch, error]);

    return (
        <Fragment>
            {loading ? (
                <Loader />
            ) : (
                <Fragment>
                    <MetaData title="Change Password" />
                    <div className="updatePasswordContainer">
                        <div className="updatePasswordBox">
                            <h2 className="updatePasswordHeading">Change Password</h2>

                            <form
                                className="updatePasswordForm"
                                onSubmit={updatePasswordSubmit}
                            >
                                <div className="loginPassword">
                                    <MdVpnKey />
                                    <input
                                        name="oldPassword"
                                        type="password"
                                        placeholder="Old Password"
                                        required
                                        value={oldPassword}
                                        onChange={(e) => setOldPassword(e.target.value)}
                                    />
                                </div>

                                <div className="loginPassword">
                                    <BiLockOpenAlt />
                                    <input
                                        name="newPassword"
                                        type="password"
                                        placeholder="New Password"
                                        required
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                    />
                                </div>
                                <div className="loginPassword">
                                    <BiLockOpenAlt />
                                    <input
                                        name="confirmPassword"
                                        type="password"
                                        placeholder="Confirm Password"
                                        required
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                    />
                                </div>
                                <input
                                    type="submit"
                                    value="Change"
                                    className="updatePasswordBtn"
                                />
                            </form>
                        </div>
                    </div>
                </Fragment>
            )}
        </Fragment>
    );
};

export default UpdatePassword;