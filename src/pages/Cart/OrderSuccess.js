import React from "react";
import { AiOutlineCheckCircle } from 'react-icons/ai'
import "./OrderSuccess.css";
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";

const OrderSuccess = () => {
    return (
        <div className="orderSuccess">
            <AiOutlineCheckCircle />
            <Typography>Your Order has been Placed successfully </Typography>
            <Link to="/orders">View Orders</Link>
        </div>
    );
};

export default OrderSuccess;