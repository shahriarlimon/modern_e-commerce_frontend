
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import WebFont from "webfontloader";
import { useEffect } from 'react';
import Footer from './components/overlays/Footer/Footer';
import Header from './components/overlays/Header/Header';
import Home from './pages/Home/Home';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });
  }, [])
  return <Router>
    <Header />
    <Routes>
      <Route path='/' element={<Home />} />
    </Routes>
    <ToastContainer />
    <Footer />
  </Router>

}

export default App;
