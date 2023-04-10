
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import WebFont from "webfontloader";
import { useEffect, useState } from 'react';
import Footer from './components/overlays/Footer/Footer';
import Header from './components/overlays/Header/Header';
import Home from './pages/Home/Home';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProductDetails from './pages/Product/ProductDetails';
import Products from './pages/Products/Products';
import Search from './pages/Products/Search';
import store, { server } from './redux/store';
import { loadUser } from './redux/actions/userAction';
import { useSelector } from 'react-redux';
import UserOptions from './components/overlays/Header/UserOptions';
import Profile from './pages/User/Profile';
import UpdateProfile from './pages/User/UpdateProfile';
import UpdatePassword from './pages/User/UpdatePassword';
import Cart from './pages/Cart/Cart';
import Shipping from './pages/Cart/Shipping';
import ConfirmOrder from './pages/Cart/ConfirmOrder';
import axios from 'axios';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Payment from './pages/Cart/Payment';
import OrderSuccess from './pages/Cart/OrderSuccess';
import MyOrders from './pages/Order/Myorders';
import OrderDetails from './pages/Order/OrderDetails';
import Dashboard from './pages/Admin/Dashboard';
import ProductList from './pages/Admin/ProductList';
import NewProduct from './pages/Admin/NewProduct';
import UpdateProduct from './pages/Admin/UpdateProduct';
import OrderList from './pages/Admin/OrderList';
import ProcessOrder from './pages/Admin/ProcessOrder';
import UserList from './pages/Admin/UserList';
import UpdateUser from './pages/Admin/UpdateUser';
import ProductReviews from './pages/Admin/ProductReview';
import Contact from './pages/Contact/Contact';
import About from './pages/About/About';
import NotFound from './pages/NotFound/NotFound';
import { getProducts } from './redux/actions/productActions';
import LoginSignupPage from './pages/User/LoginSignup/LoginSignupPage';
import ProtectedRoute from './Route/ProtectedRoute';

function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const [stripeApiKey, setStripeApiKey] = useState("");
  async function getStripeApiKey() {
    const { data } = await axios.get(`${server}/payment/stripeapikey`, {
      withCredentials: true
    })
    setStripeApiKey(data.stripeApiKey)
  }

  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    })
    store.dispatch(loadUser())
    store.dispatch(getProducts())
    getStripeApiKey()

  }, [])
  window.addEventListener("contextmenu", (e) => e.preventDefault())
  return <Router>
    <Header />
    {
      isAuthenticated && <UserOptions user={user} />
    }
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/product/:id' element={<ProductDetails />} />
      <Route path='/products' element={<Products />} />
      <Route path='/products/:keyword' element={<Products />} />
      <Route path='/search' element={<Search />} />
      <Route path='/profile' element={<ProtectedRoute><Profile /></ProtectedRoute>} />
      <Route path="/update-profile" element={<ProtectedRoute><UpdateProfile /></ProtectedRoute>} />
      <Route path='/password/update' element={<ProtectedRoute><UpdatePassword /></ProtectedRoute>} />
      <Route path='/cart' element={<ProtectedRoute><Cart /></ProtectedRoute>} />
      <Route path='/shipping' element={<ProtectedRoute><Shipping /></ProtectedRoute>} />
      <Route path='/order/confirm' element={<ProtectedRoute><ConfirmOrder /></ProtectedRoute>} />
      {stripeApiKey && (<Route path="/process/payment" element={<Elements stripe={loadStripe(stripeApiKey)}>
        <Payment />
      </Elements>} >
      </Route>)}
      <Route path='/success' element={<ProtectedRoute><OrderSuccess /></ProtectedRoute>} />
      <Route path='/orders' element={<ProtectedRoute><MyOrders /></ProtectedRoute>} />
      <Route path='/order/:id' element={<ProtectedRoute><OrderDetails /></ProtectedRoute>} />

      {/* <Route element={<ProtectedRoute isAuthenticated={isAuthenticated}
        adminRoute={true}
        isAdmin={user && user.role === "admin"}
        redirectAdmin="/profile" />} >
        <Route path='/admin/dashboard' element={<Dashboard />} />
        <Route path='/admin/products' element={<ProductList />} />
        <Route path='/admin/product' element={<NewProduct />} />
        <Route path='/admin/product/:id' element={<UpdateProduct />} />
        <Route path='/admin/orders' element={<OrderList />} />
        <Route path='/admin/order/:id' element={<ProcessOrder />} />
        <Route path='/admin/users' element={<UserList />} />
        <Route path='/admin/user/:id' element={<UpdateUser />} />
        <Route path='/admin/reviews' element={<ProductReviews />} />
      </Route> */}
      <Route
        path="/login"
        element={
          <LoginSignupPage />
        }
      />
      <Route path='/contact' element={<Contact />} />
      <Route path='/about' element={<About />} />
      <Route path='*' element={<NotFound />} />
    </Routes>
    <ToastContainer />
    <Footer />
  </Router>

}

export default App;
