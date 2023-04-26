import logo from './logo.svg';
import './App.css';
import Layout from './components/Layout/Layout';
import { createBrowserRouter, createHashRouter, Navigate, RouterProvider } from 'react-router-dom';


import NotFound from './components/NotFound/NotFound';
import Home from './components/Home/Home';
import Products from './components/Products/Products';
import Categories from './components/Categories/Categories';
import Brands from './components/Brands/Brands';
import Cart from './components/Cart/Cart';
import Register from './components/Register/Register';
import Login from './components/Login/Login';
import { useContext, useEffect, useState } from 'react';
import jwtDecode from 'jwt-decode'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import ProductDetalis from './components/ProductDetalis/ProductDetalis';
import { CartContextProvider } from './Context/CartContext';

import toast, { Toaster } from 'react-hot-toast';
import Checkout from './components/Checkout/Checkout';
import { Offline, Online } from "react-detect-offline";
import Wishlist from './components/Wishlist/Wishlist';
import BrandsDetalis from './components/BrandsDetalis/BrandsDetalis';

function App() {


  useEffect(() => {

    if (localStorage.getItem('userToken') !== null) {
      savUserData()
    }

  }, []);
  const [userdata, setUserdata] = useState(null);
  function savUserData() {
    let encodedToken = localStorage.getItem('userToken');
    let decodedToken = jwtDecode(encodedToken);
    setUserdata(decodedToken);

  }

  let routers = createHashRouter([
    {
      path: '', element: <Layout setUserdata={setUserdata} userdata={userdata} />, children: [
        { index: true, element: <ProtectedRoute ><Home /></ProtectedRoute> },
        { path: "cart", element: <ProtectedRoute ><Cart /></ProtectedRoute> },
        { path: "productdatalis/:id", element: <ProtectedRoute ><ProductDetalis /></ProtectedRoute> },
        { path: "brandsDetalis/:id", element: <ProtectedRoute ><BrandsDetalis /></ProtectedRoute> },
        { path: "products", element: <ProtectedRoute ><Products /></ProtectedRoute> },
        { path: "brands", element: <ProtectedRoute ><Brands /></ProtectedRoute> },
        { path: "wishlist", element: <ProtectedRoute ><Wishlist /></ProtectedRoute> },
        { path: "checkout", element: <ProtectedRoute ><Checkout /></ProtectedRoute> },
        { path: "categories", element: <ProtectedRoute ><Categories /></ProtectedRoute> },
        { path: 'Register', element: <Register /> },
        { path: 'Login', element: <Login savUserData={savUserData} /> },
        { path: "*", element: <NotFound /> },
      ]
    }
  ])

  return <>

    {/* <Online> <div className='network'>Only shown when you're online</div> </Online> */}
    <Offline><div className='network'>Only shown offline (surprise!)</div> </Offline>

    <Toaster />
    <CartContextProvider><RouterProvider router={routers}></RouterProvider></CartContextProvider>


  </>
}

export default App;
