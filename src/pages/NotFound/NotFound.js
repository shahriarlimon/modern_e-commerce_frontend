import React from "react";
import "./NotFound.css";
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import { BiMessageError } from "react-icons/bi";

const NotFound = () => {
    return (
        <div className="PageNotFound">
            <BiMessageError />

            <Typography>Page Not Found </Typography>
            <Link to="/">Home</Link>
        </div>
    );
};

export default NotFound;