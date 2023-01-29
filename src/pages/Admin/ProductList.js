import React, { Fragment, useEffect } from "react";
import { DataGrid } from '@mui/x-data-grid';
import "./ProductList.css";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import { FaRegEdit } from 'react-icons/fa';
import { AiOutlineDelete } from 'react-icons/ai'
import SideBar from "./Sidebar";
import { clearErrors, getAdminProduct } from "../../redux/actions/productActions";
import { toast } from 'react-toastify'
import MetaData from "../../components/overlays/MetaData/MetaData";

const ProductList = () => {
    const dispatch = useDispatch();
    const { error, products } = useSelector((state) => state.products);

    /*     const { error: deleteError, isDeleted } = useSelector(
            (state) => state.product
        ); */

    const deleteProductHandler = (id) => {
        /* dispatch(deleteProduct(id)); */
    };

    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch(clearErrors());
        }

        /*   if (deleteError) {
              alert.error(deleteError);
              dispatch(clearErrors());
          }
  
          if (isDeleted) {
              toast.success("Product Deleted Successfully");
               history.push("/admin/dashboard");
               dispatch({ type: DELETE_PRODUCT_RESET });
          } */

        dispatch(getAdminProduct());
    }, [dispatch, error]);

    const columns = [
        { field: "id", headerName: "Product ID", minWidth: 200, flex: 0.5 },

        {
            field: "name",
            headerName: "Name",
            minWidth: 350,
            flex: 1,
        },
        {
            field: "stock",
            headerName: "Stock",
            type: "number",
            minWidth: 150,
            flex: 0.3,
        },

        {
            field: "price",
            headerName: "Price",
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
                    <Fragment>
                        <Link to={`/admin/product/${params?.getValue(params?.id, "id")}`}>
                            <FaRegEdit />
                        </Link>

                        <Button
                            onClick={() =>
                                deleteProductHandler(params?.getValue(params?.id, "id"))
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

    products &&
        products?.forEach((item) => {
            rows?.push({
                id: item?._id,
                stock: item?.Stock,
                price: item?.price,
                name: item?.name,
            });
        });

    return (
        <Fragment>
            <MetaData title={`ALL PRODUCTS - Admin`} />

            <div className="dashboard">
                <SideBar />
                <div className="productListContainer">
                    <h1 id="productListHeading">ALL PRODUCTS</h1>

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

export default ProductList;