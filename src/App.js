
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import WebFont from "webfontloader";
import { useEffect } from 'react';
import Footer from './components/overlays/Footer/Footer';
import Header from './components/overlays/Header/Header';
import Home from './pages/Home/Home';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProductDetails from './pages/Product/ProductDetails';
import Products from './pages/Products/Products';
import Search from './pages/Products/Search';
import LoginSignUp from './pages/User/LoginSignUp';
import store from './redux/store';
import { loadUser } from './redux/actions/userAction';
import { useSelector } from 'react-redux';
import UserOptions from './components/overlays/Header/UserOptions';
import Profile from './pages/User/Profile';
import ProtectedRoute from './components/Routes/ProtectedRoute';
import UpdateProfile from './pages/User/UpdateProfile';
import UpdatePassword from './pages/User/UpdatePassword';

function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user)
  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    })
    store.dispatch(loadUser())
  }, [])
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
      <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
        <Route path='/profile' element={<Profile />} />
        <Route path="/update-profile" element={<UpdateProfile />} />
        <Route path='/password/update' element={<UpdatePassword />} />
      </Route>
      {/*  <Route path="/profile" element={<ProtectedRoute isAuthenticated={isAuthenticated}><Profile /></ProtectedRoute>} /> */}
      <Route path='/login' element={<LoginSignUp />} />
    </Routes>
    <ToastContainer />
    <Footer />
  </Router>

}

export default App;
