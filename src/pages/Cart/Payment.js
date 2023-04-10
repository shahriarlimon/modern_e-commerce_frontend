import { Typography } from '@material-ui/core';
import "./Payment.css";
import React, { Fragment, useEffect, useRef } from 'react'
import MetaData from '../../components/overlays/MetaData/MetaData'
import CheckoutSteps from './CheckoutSteps';
import {
    CardNumberElement,
    CardCvcElement,
    CardExpiryElement,
    useStripe,
    useElements,
} from "@stripe/react-stripe-js";
import { AiOutlineCreditCard } from 'react-icons/ai';
import { MdVpnKey } from 'react-icons/md';
import { CgEventbrite } from 'react-icons/cg';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify'
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import { clearErrors, createOrder } from '../../redux/actions/orderActions';
import { server } from '../../redux/store';

const Payment = () => {
    const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const stripe = useStripe();
    const elements = useElements();
    const payBtn = useRef(null);
    const { shippingInfo, cartItems } = useSelector((state) => state.cart);
    const { user } = useSelector((state) => state.user);
    const { error } = useSelector((state) => state.newOrder);

    const paymentData = {
        amount: Math.round(orderInfo.totalPrice * 100)
    }
    let order = {
        shippingInfo: { ...shippingInfo, phoneNo: Number(shippingInfo.phoneNo), zipCode: Number(shippingInfo.zipCode) },
        orderItems: cartItems,
        itemsPrice: orderInfo.subtotal,
        taxPrice: orderInfo.tax,
        shippingPrice: orderInfo.shippingCharges,
        totalPrice: orderInfo.totalPrice,
    };
    const submitHandler = async (e) => {
        e.preventDefault()
        payBtn.current.disabled = true;
        try {
            const config = {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true
            }
            const { data } = await axios.post(`${server}/payment/process/payment`, paymentData, config)
            const client_secret = data.client_secret;
            if (!elements || !stripe) return;
            const result = await stripe.confirmCardPayment(client_secret, {
                payment_method: {
                    card: elements.getElement(CardNumberElement),
                    billing_details: {
                        name: user?.name,
                        email: user?.email,
                        address: {
                            line1: shippingInfo?.address,
                            city: shippingInfo?.city,
                            state: shippingInfo?.state,
                            postal_code: shippingInfo?.zipCode,
                            country: shippingInfo?.country
                        }
                    }

                }
            })
            if (result.error) {
                payBtn.current.disabled = false;
                toast.error(result.error.message)
            } else {
                if (result.paymentIntent.status === 'succeeded') {
                    order.paymentInfo = {
                        id: result.paymentIntent.id,
                        status: result.paymentIntent.status
                    }
                    dispatch(createOrder(order));
                    navigate('/success')
                } else {
                    toast.error("There's some issues while processing payment")
                }
            }

        } catch (error) {
            payBtn.current.disabled = false;
            toast.error(error.response.data.message)
        }

    }
    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch(clearErrors());
        }
    }, [dispatch, error, user, navigate]);
    return (
        <Fragment>
            <MetaData title="Payment" />
            <CheckoutSteps activeStep={2} />
            <div className="paymentContainer">
                <form className="paymentForm" onSubmit={(e) => submitHandler(e)}>
                    <Typography>Card Info</Typography>
                    <div>
                        < AiOutlineCreditCard />
                        <CardNumberElement className="paymentInput" />
                    </div>
                    <div>
                        <CgEventbrite />
                        <CardExpiryElement className="paymentInput" />
                    </div>
                    <div>
                        <MdVpnKey />
                        <CardCvcElement className="paymentInput" />
                    </div>

                    <input
                        type="submit"
                        value={`Pay - $${orderInfo && orderInfo.totalPrice}`}
                        ref={payBtn}
                        className="paymentFormBtn"
                    />
                </form>
            </div>
        </Fragment>
    )
}

export default Payment
