import React from 'react';
import PropTypes from 'prop-types';
import styles from './Layout.module.css';
import Navbar from './../Navbar/Navbar';
import Footer from './../Footer/Footer';
import { Outlet } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export default function Layout({userdata , setUserdata})  {
    let navigate = useNavigate()
    function logout(){
        localStorage.removeItem('userToken');
        setUserdata(null);
        navigate('/Login')
       }
    return <>
 <div className='pt-5'>
 <Navbar  logout={logout} userdata={userdata}/>

<div className='container py-5'>

<Outlet></Outlet>
</div>

 <Footer />
 </div>
    
    </>
}

 
