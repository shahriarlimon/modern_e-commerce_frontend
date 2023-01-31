import React, { Fragment, useEffect } from "react";
import { DataGrid } from '@mui/x-data-grid';
import "./ProductList.css";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@material-ui/core";
import { FaRegEdit } from 'react-icons/fa';
import { AiOutlineDelete } from 'react-icons/ai'
import SideBar from "./Sidebar";
import { toast } from 'react-toastify'
import MetaData from "../../components/overlays/MetaData/MetaData";
import { clearErrors, deleteUser, getAllUsers } from "../../redux/actions/userAction";
import { DELETE_USER_RESET } from "../../redux/actionTypes/userActionTypes";

const UserList = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const { error, users, loading } = useSelector((state) => state.allUsers);

    const { error: deleteError, isDeleted, message } = useSelector(
        (state) => state.profile
    );

    const deleteUserHandler = (id) => {
        dispatch(deleteUser(id));
    };

    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch(clearErrors());
        }

        if (deleteError) {
            toast.error(deleteError);
            dispatch(clearErrors());
        }

        if (isDeleted) {
            toast.success(message);
            navigate("/admin/users");
            dispatch({ type: DELETE_USER_RESET });
        }

        dispatch(getAllUsers());
    }, [dispatch, error, deleteError, navigate, isDeleted, message]);

    const columns = [
        { field: "id", headerName: "User ID", minWidth: 180, flex: 0.5 },

        {
            field: "email",
            headerName: "Email",
            minWidth: 200,
            flex: 1,
        },
        {
            field: "name",
            headerName: "Name",
            minWidth: 150,
            flex: 0.5,
        },

        {
            field: "role",
            headerName: "Role",
            minWidth: 270,
            flex: 0.3,
            cellClassName: (params) => {
                return params.getValue(params.id, "role") === "admin" ? "greenColor" : "redColor"
            }

        },

        {
            field: "actions",
            flex: 0.3,
            headerName: "Actions",
            minWidth: 150,
            type: "number",
            sortable: false,
            renderCell: (params) => {
                return (
                    <Fragment>
                        <Link to={`/admin/user/${params?.getValue(params?.id, "id")}`}>
                            <FaRegEdit />
                        </Link>

                        <Button
                            onClick={() =>
                                deleteUserHandler(params?.getValue(params?.id, "id"))
                            }
                        >
                            <AiOutlineDelete />
                        </Button>
                    </Fragment>
                );
            },
        },
    ];

    const rows = [];

    users &&
        users?.forEach((item) => {
            rows?.push({
                id: item?._id,
                email: item?.email,
                name: item?.name,
                role: item?.role,
            });
        });

    return (
        <Fragment>
            <MetaData title={`ALL USERS - Admin`} />

            <div className="dashboard">
                <SideBar />
                <div className="productListContainer">
                    <h1 id="productListHeading">ALL USERS</h1>

                    <DataGrid
                        rows={rows}
                        columns={columns}
                        pageSize={10}
                        disableSelectionOnClick
                        className="productListTable"
                        autoHeight
                    />
                </div>
            </div>
        </Fragment>
    );
};

export default UserList;