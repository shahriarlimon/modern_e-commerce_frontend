import React, { Fragment, useEffect, useState } from 'react';
import "./ProductDetails.css";
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom'
import { getProductDetails } from '../../redux/actions/productActions';
import { Rating } from "@material-ui/lab";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import Loader from '../../components/overlays/Loader/Loader';
import ReviewCard from './ProductCard';
function ProductDetails() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { product, loading, error } = useSelector((state) => state.productDetails)

    const options = {
        size: "large",
        value: product?.ratings,
        readOnly: true,
        precision: 0.5,
    };
    const [quantity, setQuantity] = useState(1);
    const [open, setOpen] = useState(false);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");

    const increaseQuantity = () => {
        if (product.Stock <= quantity) return;

        const qty = quantity + 1;
        setQuantity(qty);
    };

    const decreaseQuantity = () => {
        if (1 >= quantity) return;

        const qty = quantity - 1;
        setQuantity(qty);
    };

    useEffect(() => {
        dispatch(getProductDetails(id))
    }, [dispatch, id])

    return (
        <Fragment>
            {
                loading ? (<Loader />) : (<Fragment>

                    <div className='ProductDetails'>
                        <div>
                            {
                                product?.images && product?.images.map((item, idx) => (
                                    <img alt={`${idx} slide`} key={item?.url} src={item?.url} className='CarouselImage' />
                                ))
                            }

                        </div>
                        <div>
                            <div className='detailsBlock-1'>
                                <h2>{product?.name}</h2>
                                <p>product #{product?._id}</p>
                            </div>
                            <div className="detailsBlock-2">
                                <Rating {...options} />
                                <span className="detailsBlock-2-span">
                                    {" "}
                                    ({product?.numOfReviews} Reviews)
                                </span>
                            </div>
                            <div className="detailsBlock-3">
                                <h1>{`$${product?.price}`}</h1>
                                <div className="detailsBlock-3-1">
                                    <div className="detailsBlock-3-1-1">
                                        <button onClick={decreaseQuantity}>-</button>
                                        <input readOnly type="number" value={quantity} />
                                        <button onClick={increaseQuantity}>+</button>
                                    </div>
                                    <button
                                        disabled={product?.Stock < 1 ? true : false}
                                    >
                                        Add to Cart
                                    </button>
                                </div>

                                <p>
                                    Status:
                                    <b className={product?.Stock < 1 ? "redColor" : "greenColor"}>
                                        {product?.Stock < 1 ? "OutOfStock" : "InStock"}
                                    </b>
                                </p>
                            </div>
                            <div className="detailsBlock-4">
                                Description : <p>{product?.description}</p>
                            </div>
                            <button className="submitReview">
                                Submit Review
                            </button>


                        </div>
                    </div>
                    <h3 className="reviewsHeading">REVIEWS</h3>
                    v <Dialog
                        aria-labelledby="simple-dialog-title"
                        open={open}
                    >
                        <DialogTitle>Submit Review</DialogTitle>
                        <DialogContent className="submitDialog">
                            <Rating
                                onChange={(e) => setRating(e.target.value)}
                                value={rating}
                                size="large"
                            />

                            <textarea
                                className="submitDialogTextArea"
                                cols="30"
                                rows="5"
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                            ></textarea>
                        </DialogContent>
                        <DialogActions>
                            <Button color="secondary">
                                Cancel
                            </Button>
                            <Button color="primary">
                                Submit
                            </Button>
                        </DialogActions>
                    </Dialog>
                    {product?.reviews && product?.reviews[0] ? (
                        <div className="reviews">
                            {product?.reviews &&
                                product?.reviews.map((review) => (
                                    <ReviewCard key={review?._id} review={review} />
                                ))}
                        </div>
                    ) : (
                        <p className="noReviews">No Reviews Yet</p>
                    )}
                </Fragment>)
            }

        </Fragment>
    )
}

export default ProductDetails
