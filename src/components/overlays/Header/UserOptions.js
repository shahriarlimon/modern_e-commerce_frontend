import React, { Fragment, useState } from "react";
import "./Header.css";
import { SpeedDial, SpeedDialAction } from "@material-ui/lab";
import Backdrop from "@material-ui/core/Backdrop";
import { MdDashboardCustomize } from 'react-icons/md';
import { BsFillPersonLinesFill } from "react-icons/bs"
import { IoMdExit } from 'react-icons/io';
import { AiOutlineUnorderedList } from 'react-icons/ai';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { logout } from "../../../redux/actions/userAction";



function UserOptions({ user }) {
    const [open, setOpen] = useState(false);
    const { cartItems } = useSelector((state) => state.cart)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const options = [
        { icon: <AiOutlineUnorderedList />, name: "Orders", func: orders },
        { icon: <BsFillPersonLinesFill />, name: "Profile", func: account },
        {
            icon: (
                < AiOutlineShoppingCart
                    style={{ color: cartItems.length > 0 ? "tomato" : "unset" }}
                />
            ),
            name: `Cart(${cartItems.length})`,
            func: cart,
        },
        { icon: <IoMdExit />, name: "Logout", func: logoutUser },
    ];

    if (user.role === "admin") {
        options.unshift({
            icon: <MdDashboardCustomize />,
            name: "Dashboard",
            func: dashboard,
        });
    }

    function dashboard() {
        navigate("/admin/dashboard");
    }

    function orders() {
        navigate("/orders");
    }
    function account() {
        navigate("/profile");
    }
    function cart() {
        navigate("/cart");
    }
    function logoutUser() {
        dispatch(logout())
        toast.success("Logout Successfully");
    }
    return (
        <Fragment>
            <Backdrop open={open} style={{ zIndex: "10" }} />
            <SpeedDial
                ariaLabel="SpeedDial tooltip example"
                onClose={() => setOpen(false)}
                onOpen={() => setOpen(true)}
                style={{ zIndex: "11" }}
                open={open}
                direction="down"
                className="speedDial"
                icon={
                    <img
                        className="speedDialIcon"
                        src={user?.avatar?.url ? user.avatar.url : "/Profile.png"}
                        alt="Profile"
                    />
                }
            >
                {options.map((item) => (
                    <SpeedDialAction
                        key={item.name}
                        icon={item.icon}
                        tooltipTitle={item.name}
                        onClick={item.func}
                        tooltipOpen={window.innerWidth <= 600 ? true : false}
                    />
                ))}
            </SpeedDial>
        </Fragment>
    )
}

export default UserOptions
