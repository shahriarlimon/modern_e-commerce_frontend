import React from "react";
import "./Sidebar.css";
import logo from "../../images/logo.png";
import { Link } from "react-router-dom";
import { TreeView, TreeItem } from "@material-ui/lab";
import { IoIosExpand } from 'react-icons/io';
import { MdPostAdd } from 'react-icons/md'
import { AiFillFileAdd } from "react-icons/ai"
import { MdImportExport } from 'react-icons/md'
import { FaListAlt } from 'react-icons/fa'
import { MdSpaceDashboard } from 'react-icons/md';
import { BsPeople } from 'react-icons/bs';
import { MdOutlineRateReview } from 'react-icons/md'

const Sidebar = () => {
    return (
        <div className="sidebar">
            <Link to="/">
                <img src={logo} alt="Ecommerce" />
            </Link>
            <Link to="/admin/dashboard">
                <p>
                    <MdSpaceDashboard /> Dashboard
                </p>
            </Link>
            <Link>
                <TreeView
                    defaultCollapseIcon={<IoIosExpand />}
                    defaultExpandIcon={<MdImportExport />}
                >
                    <TreeItem nodeId="1" label="Products">
                        <Link to="/admin/products">
                            <TreeItem nodeId="2" label="All" icon={<MdPostAdd/>} />
                        </Link>

                        <Link to="/admin/product">
                            <TreeItem nodeId="3" label="Create" icon={< AiFillFileAdd/>} />
                        </Link>
                    </TreeItem>
                </TreeView>
            </Link>
            <Link to="/admin/orders">
                <p>
                    <FaListAlt />
                    Orders
                </p>
            </Link>
            <Link to="/admin/users">
                <p>
                    <BsPeople /> Users
                </p>
            </Link>
            <Link to="/admin/reviews">
                <p>
                    <MdOutlineRateReview />
                    Reviews
                </p>
            </Link>
        </div>
    );
};

export default Sidebar;