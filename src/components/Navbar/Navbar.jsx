import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import styles from './Navbar.module.css';
import { Link } from 'react-router-dom';
import logo from '../../images/freshcart-logo.svg';
import { carteContext } from '../../Context/CartContext';
import Wishlist from './../Wishlist/Wishlist';



export default function Navbar({userdata , logout})  {


    let {displayCart , displayWishlist} = useContext(carteContext)
    return <>
    <nav className="navbar position-fixed fixed-top navbar-expand-sm navbar-light bg-light">
          <div className="container">
            <Link className="navbar-brand" to="/"><img src={logo} alt="" /></Link>
            <button className="navbar-toggler d-lg-none" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavId" aria-controls="collapsibleNavId"
                aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="collapsibleNavId">
                {userdata !== null?              <ul className="navbar-nav me-auto mt-2 mt-lg-0">
                   
                   <li className="nav-item">
                       <Link className="nav-link" to="/">Home</Link>
                   </li>

                   <li className="nav-item">
                       <Link className="nav-link" to="Products">Products</Link>
                   </li>
                   <li className="nav-item">
                       <Link className="nav-link" to="Categories">Categories</Link>
                   </li>
                   <li className="nav-item">
                       <Link className="nav-link" to="brands">Brands</Link>
                   </li>
   
               </ul>:null}


                <ul className="navbar-nav ms-auto mt-2 mt-lg-0">
                <li className="nav-item d-flex align-items-center ">
                      
                        <i className="fab fa-facebook mx-2"></i>
                        <i className="fab fa-twitter mx-2"></i>
                        <i className="fab fa-instagram mx-2"></i>
                        <i className="fab fa-tiktok mx-2"></i>
                        <i className="fab fa-linkedin mx-2"></i>
                        <i className="fab fa-youtube mx-2"></i>
                       
                    </li>
                    {userdata == null? <>
                    
                        <li className="nav-item">
                        <Link className="nav-link" to="Login">Login</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="Register">Register</Link>
                    </li>
                    </>:  <>
                    
                    <li className="nav-item">
                                       <Link className="nav-link" to="cart"> Cart <i className='fas fa-shopping-cart fa-lg'></i><span className='badge bg-main text-white'>{displayCart}</span></Link>
                                   </li>
                    <li className="nav-item">
                                       <Link className="nav-link" to="wishlist"> Wishlist <i className='fa-regular fa-heart fa-lg'></i><span className='badge bg-main text-white'>{displayWishlist}</span></Link>
                                   </li>
                     <li className="nav-item">
                        <span onClick={logout} className="cursor-pointer nav-link" >SignOut</span>
                    </li>
                    </>  }

     


    
                </ul>
            
            </div>
      </div>
    </nav>
    
    
    </>
}

 
