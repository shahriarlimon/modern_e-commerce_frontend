import React, { Fragment, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import "./Products.css";
import Loader from '../../components/overlays/Loader/Loader';
import { getProducts } from '../../redux/actions/productActions';
import ProductCard from '../Home/ProductCart';
import { useParams } from 'react-router-dom';

function Products() {
    const dispatch = useDispatch();
    const { keyword } = useParams()
    console.log(keyword)
    const { loading, error, products, productsCount } = useSelector((state) => state.products);
    useEffect(() => {
        dispatch(getProducts(keyword))
    }, [keyword, dispatch])
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


                </Fragment>)
            }
        </Fragment>
    )
}

export default Products
