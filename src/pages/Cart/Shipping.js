import React, { Fragment, useState } from "react";
import "./Shipping.css";
import { useSelector, useDispatch } from "react-redux";
import { MdPinDrop } from 'react-icons/md';
import { FcHome } from 'react-icons/fc';
import { HiLocationMarker } from 'react-icons/hi';
import { MdPublic } from "react-icons/md";
import { AiOutlinePhone } from "react-icons/ai";
import { MdTransferWithinAStation } from 'react-icons/md'
import { Country, State } from "country-state-city";
import CheckoutSteps from "../Cart/CheckoutSteps";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import MetaData from "../../components/overlays/MetaData/MetaData";
import { saveShippingInfo } from "../../redux/actions/cartActions";

const Shipping = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const { shippingInfo } = useSelector((state) => state.cart);

    const [address, setAddress] = useState(shippingInfo?.address);
    const [city, setCity] = useState(shippingInfo?.city);
    const [state, setState] = useState(shippingInfo?.state);
    const [country, setCountry] = useState(shippingInfo?.country);
    const [zipCode, setZipCode] = useState(shippingInfo?.zipCode);
    const [phoneNo, setPhoneNo] = useState(shippingInfo?.phoneNo);

    const shippingSubmit = (e) => {
        e.preventDefault();

        if (phoneNo.length < 11 || phoneNo.length > 11) {
            toast.error("Phone Number should be 11 digits Long");
            return;
        }
        dispatch(
            saveShippingInfo({ address, city, state, country, zipCode, phoneNo })
        );
        navigate("/order/confirm");
    };

    return (
        <Fragment>
            <MetaData title="Shipping Details" />

            <CheckoutSteps activeStep={0} />

            <div className="shippingContainer">
                <div className="shippingBox">
                    <h2 className="shippingHeading">Shipping Details</h2>

                    <form
                        className="shippingForm"
                        encType="multipart/form-data"
                        onSubmit={shippingSubmit}
                    >
                        <div>
                            <FcHome />
                            <input
                                type="text"
                                placeholder="Address"
                                required
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                            />
                        </div>

                        <div>
                            <HiLocationMarker />
                            <input
                                type="text"
                                placeholder="City"
                                required
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                            />
                        </div>

                        <div>
                            <MdPublic />
                            <input
                                type="number"
                                placeholder="Zip Code"
                                required
                                value={zipCode}
                                onChange={(e) => setZipCode(e.target.value)}
                            />
                        </div>

                        <div>
                            <AiOutlinePhone />
                            <input
                                type="number"
                                placeholder="Phone Number"
                                required
                                value={phoneNo}
                                onChange={(e) => setPhoneNo(e.target.value)}
                                size="10"
                            />
                        </div>

                        <div>
                            <MdPinDrop />

                            <select
                                required
                                value={country}
                                onChange={(e) => setCountry(e.target.value)}
                            >
                                <option value="">Country</option>
                                {Country &&
                                    Country?.getAllCountries()?.map((item) => (
                                        <option key={item?.isoCode} value={item?.isoCode}>
                                            {item?.name}
                                        </option>
                                    ))}
                            </select>
                        </div>

                        {country && (
                            <div>
                                <MdTransferWithinAStation />

                                <select
                                    required
                                    value={state}
                                    onChange={(e) => setState(e.target.value)}
                                >
                                    <option value="">State</option>
                                    {State &&
                                        State.getStatesOfCountry(country).map((item) => (
                                            <option key={item.isoCode} value={item.isoCode}>
                                                {item.name}
                                            </option>
                                        ))}
                                </select>
                            </div>
                        )}

                        <input
                            type="submit"
                            value="Continue"
                            className="shippingBtn"
                            disabled={state ? false : true}
                        />
                    </form>
                </div>
            </div>
        </Fragment>
    );
};

export default Shipping;