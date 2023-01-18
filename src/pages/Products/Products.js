import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import "./Products.css";
import Loader from '../../components/overlays/Loader/Loader';
import { clearErrors, getProducts } from '../../redux/actions/productActions';
import ProductCard from '../Home/ProductCart';
import { useParams } from 'react-router-dom';
import Pagination from "react-js-pagination";
import Slider from "@material-ui/core/Slider";
import Typography from "@material-ui/core/Typography";
import { toast } from 'react-toastify';
import MetaData from '../../components/overlays/MetaData/MetaData';

const categories = [
    "Laptop",
    "Footwear",
    "Bottom",
    "Tops",
    "Attire",
    "Camera",
    "SmartPhones",
];

function Products() {
    const dispatch = useDispatch();
    const { keyword } = useParams()
    const { loading, error, products, productsCount, resultPerPage } = useSelector((state) => state.products);
    const [currentPage, setCurrentPage] = useState(1)
    const [price, setPrice] = useState([0, 20000])
    const [category, setCategory] = useState("");
    const [ratings, setRatings] = useState(0);
    const setCurrentPageNo = (e) => {
        setCurrentPage(e)
    }
    const priceHandler = (event, newPrice) => {
        setPrice(newPrice)
    }
    useEffect(() => {
        if (error) {
            toast.error(error)
            dispatch(clearErrors())
        }
        dispatch(getProducts(keyword, currentPage, price, category, ratings))
    }, [keyword, dispatch, currentPage, price, category, ratings, error])
    return (
        <Fragment>

            {
                loading ? <Loader /> : (<Fragment>
                    <MetaData title={"Products--Ecommerce"}/>
                    <h2 className='productsHeading'>Products</h2>
                    <div className='products'>
                        {
                            products && products.map((product) => <ProductCard product={product} key={product?._id} />)
                        }
                    </div>
                    <div className="filterBox">
                        <Typography>Price</Typography>
                        <Slider
                            value={price}
                            onChange={priceHandler}
                            valueLabelDisplay="auto"
                            aria-labelledby="range-slider"
                            min={0}
                            max={25000}
                        />
                        <Typography>Categories</Typography>
                        <ul className="categoryBox">
                            {categories.map((category) => (
                                <li
                                    className="category-link"
                                    key={category}
                                    onClick={() => setCategory(category)}
                                >
                                    {category}
                                </li>
                            ))}
                        </ul>
                        <fieldset>
                            <Typography component="legend">Ratings Above</Typography>
                            <Slider
                                value={ratings}
                                onChange={(e, newRating) => {
                                    setRatings(newRating);
                                }}
                                aria-labelledby="continuous-slider"
                                valueLabelDisplay="auto"
                                min={0}
                                max={5}
                            />
                        </fieldset>
                    </div>
                    {resultPerPage < productsCount && (
                        <div className="paginationBox">
                            <Pagination
                                activePage={currentPage}
                                itemsCountPerPage={resultPerPage}
                                totalItemsCount={productsCount}
                                onChange={setCurrentPageNo}
                                nextPageText="Next"
                                prevPageText="Prev"
                                firstPageText="1st"
                                lastPageText="Last"
                                itemClass="page-item"
                                linkClass="page-link"
                                activeClass="pageItemActive"
                                activeLinkClass="pageLinkActive"
                            />
                        </div>
                    )}


                </Fragment>)
            }
        </Fragment>
    )
}

export default Products
