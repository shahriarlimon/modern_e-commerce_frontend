import React, { Fragment, useEffect, useState } from "react";
import "./MyOrders.css";
import { DataGrid } from '@mui/x-data-grid';
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import Box from '@mui/material/Box';
import { MdLaunch } from 'react-icons/md'
import { clearErrors, myOrders } from "../../redux/actions/orderActions";
import MetaData from "../../components/overlays/MetaData/MetaData";
import Loader from "../../components/overlays/Loader/Loader";
import { toast } from "react-toastify";

const MyOrders = () => {
    const dispatch = useDispatch();

    const { loading, orders } = useSelector((state) => state?.myOrders);
    const { user } = useSelector((state) => state?.user);
    const [error, setError] = useState(null)

    const columns = [
        { field: "id", headerName: "Order ID", minWidth: 300, flex: 1 },

        {
            field: "status",
            headerName: "Status",
            minWidth: 150,
            flex: 0.5,
            cellClassName: (params) => {
                return params.getValue(params.id, "status") === "Delivered"
                    ? "greenColor"
                    : "redColor";
            },
        },
        {
            field: "itemsQty",
            headerName: "Items Qty",
            type: "number",
            minWidth: 150,
            flex: 0.3,
        },

        {
            field: "amount",
            headerName: "Amount",
            type: "number",
            minWidth: 270,
            flex: 0.5,
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
                    <Link to={`/order/${params.getValue(params.id, "id")}`}>
                        <MdLaunch />
                    </Link>
                );
            },
        },
    ];
    const rows = [];

    orders &&
        orders?.forEach((item, index) => {
            rows.push({
                itemsQty: item?.orderItems.length,
                id: item?._id,
                status: item?.orderStatus,
                amount: item?.totalPrice,
            });
        });

    useEffect(() => {
        dispatch(myOrders())
            .then((response) => {
                setError(null);
            })
            .catch((error) => {
                setError(error.message);
                toast.error(error.message);
                dispatch(clearErrors());
            });
    }, [dispatch, error]);

    return (
        <Fragment>
            <MetaData title={`${user?.name} - Orders`} />

            {loading ? (
                <Loader />
            ) : (
                <div className="myOrdersPage">
                    <Box sx={{ height: 400, width: '100%' }}>
                        <DataGrid
                            rows={rows}
                            columns={columns}
                            pageSize={10}
                            disableSelectionOnClick
                            className="myOrdersTable"
                            autoHeight
                        />
                    </Box>
                    <h3 id="myOrdersHeading">{user?.name}'s Orders</h3>
                </div>
            )}
        </Fragment>
    );
};

export default MyOrders;