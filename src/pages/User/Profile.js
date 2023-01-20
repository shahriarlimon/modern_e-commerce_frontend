import React, { Fragment, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Loader from "../../components/overlays/Loader/Loader";
import MetaData from "../../components/overlays/MetaData/MetaData";
import "./Profile.css";

const Profile = () => {
    const { user, loading, isAuthenticated } = useSelector((state) => state.user);
    const navigate = useNavigate();
    const location = useLocation();
    let from = location?.state?.from?.pathname || "/profile";
    useEffect(() => {
       
        if (isAuthenticated === true) {
            navigate(from, { replace: true });
        }
    }, [navigate, isAuthenticated, from]);
    return (
        <Fragment>
            {loading ? (
                <Loader />
            ) : (
                <Fragment>
                    <MetaData title={`${user?.name}'s Profile`} />
                    <div className="profileContainer">
                        <div>
                            <h1>My Profile</h1>
                            <img src={user?.avatar?.url} alt={user?.name} />
                            <Link to="/update-profile">Edit Profile</Link>
                        </div>
                        <div>
                            <div>
                                <h4>Full Name</h4>
                                <p>{user?.name}</p>
                            </div>
                            <div>
                                <h4>Email</h4>
                                <p>{user?.email}</p>
                            </div>
                            <div>
                                <h4>Joined On</h4>
                                <p>{(user?.createdAt)}</p>
                            </div>

                            <div>
                                <Link to="/orders">My Orders</Link>
                                <Link to="/password/update">Change Password</Link>
                            </div>
                        </div>
                    </div>
                </Fragment>
            )}
        </Fragment>
    );
};

export default Profile;