
import React, { Fragment, useEffect } from "react";
import { CgMouse } from "react-icons/cg";
import "./Home.css";
import ProductCard from "../ProductCart";
import MetaData from "../../../components/overlays/MetaData/MetaData";
import Loader from "../../../components/overlays/Loader/Loader";

const HomePageComponent = ({ loading, error, products }) => {

    return (
        <Fragment>
            {
                loading ? (<Loader />) : (<Fragment>
                    <MetaData title="ECOMMERCE" />

                    <div className="banner">
                        <p>Welcome to Ecommerce</p>
                        <h1>FIND AMAZING PRODUCTS BELOW</h1>

                        <a href="#container">
                            <button>
                                Scroll <CgMouse />
                            </button>
                        </a>
                    </div>

                    <h2 className="homeHeading">Featured Products</h2>

                    <div className="container" id="container">
                        {products &&
                            products.map((product) => (
                                <ProductCard key={product._id} product={product} />
                            ))}
                    </div>


                </Fragment>)
            }
        </Fragment>


    )
}


export default HomePageComponent;