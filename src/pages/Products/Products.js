import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import "./Products.css";
import Loader from '../../components/overlays/Loader/Loader';
import { getProducts } from '../../redux/actions/productActions';
import ProductCard from '../Home/ProductCart';
import { useParams } from 'react-router-dom';
import Pagination from "react-js-pagination";

function Products() {
    const dispatch = useDispatch();
    const { keyword } = useParams()
    const { loading, error, products, productsCount, resultPerPage } = useSelector((state) => state.products);
    const [currentPage, setCurrentPage] = useState(1)
    const setCurrentPageNo = (e) => {
        setCurrentPage(e)
    }
    useEffect(() => {
        dispatch(getProducts(keyword, currentPage))
    }, [keyword, dispatch, currentPage])
    return (
        <Fragment>

            {
                loading ? <Loader /> : (<Fragment>
                    <h2 className='productsHeading'>Products</h2>
                    <div className='products'>
                        {
                            products && products.map((product) => <ProductCard product={product} key={product?._id} />)
                        }
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
