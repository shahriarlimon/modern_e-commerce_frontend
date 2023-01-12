
import React, { useEffect } from "react";
import HomePageComponent from "./components/HomePageComponent";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getProducts } from "../../redux/actions/productActions";
import { ToastContainer, toast } from 'react-toastify';

const Home = () => {
  const dispatch = useDispatch();
  const { loading, error, products } = useSelector((state) => state.products);
  useEffect(() => {
    if (error) {
      toast.error(error)
      dispatch(clearErrors())
    }
    dispatch(getProducts())
  }, [dispatch, error])


  return <HomePageComponent error={error} loading={loading} products={products} />
};

export default Home;