import React, { Fragment, useEffect, useState } from 'react';
import "./ProductDetails.css";
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom'
import { clearErrors, getProductDetails, newReview } from '../../redux/actions/productActions';
import { Rating } from "@material-ui/lab";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import Loader from '../../components/overlays/Loader/Loader';
import ReviewCard from './ProductCard';
import { addItemsToCart } from '../../redux/actions/cartActions';
import { toast } from 'react-toastify'
import { NEW_REVIEW_RESET } from '../../redux/actionTypes/productActionTypes';
function ProductDetails() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { product, loading, error } = useSelector((state) => state.productDetails)
    const { success, error: reviewError } = useSelector((state) => state.newReview)

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
    const submitReviewToggle = () => {
        open ? setOpen(false) : setOpen(true)
    }
    const reviewSubmitHandler = () => {
        const reviewData = {
            productId: id, rating, comment
        }
        dispatch(newReview(reviewData))
        setOpen(false)

    }
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
    const addToCartHandler = (id, quantity) => {
        dispatch(addItemsToCart(id, quantity))
        toast.success("Item added to cart")
    }
    useEffect(() => {
        dispatch(getProductDetails(id))
        if (error) {
            toast.error(error)
            dispatch(clearErrors())
        }
        if (reviewError) {
            toast.error(reviewError)
            dispatch(clearErrors())
        }
        if (success) {
            toast.success("Review submitted successfully")
            dispatch({ type: NEW_REVIEW_RESET })
        }
    }, [dispatch, id, error, reviewError, success])

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
                                    <button onClick={() => addToCartHandler(id, quantity)}
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
                            <button onClick={submitReviewToggle} className="submitReview">
                                Submit Review
                            </button>


                        </div>
                    </div>
                    <h3 className="reviewsHeading">REVIEWS</h3>
                    <Dialog
                        aria-labelledby="simple-dialog-title"
                        open={open}
                        onClose={submitReviewToggle}
                    >
                        <DialogTitle>Submit Review</DialogTitle>
                        <DialogContent className="submitDialog">
                            <Rating
                                name='rating'
                                onChange={(e) => setRating(e.target.value)}
                                value={rating}
                                size="large"
                            />

                            <textarea
                                className="submitDialogTextArea"
                                name='comment'
                                cols="30"
                                rows="5"
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                            ></textarea>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={submitReviewToggle} color="secondary">
                                Cancel
                            </Button>
                            <Button onClick={() => reviewSubmitHandler()} color="primary">
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
