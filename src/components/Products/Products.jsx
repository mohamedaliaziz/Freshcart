import React, { useContext, useState } from 'react';

import styles from './Products.module.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { carteContext } from '../../Context/CartContext.js';
import { toast } from 'react-hot-toast';



export default function Products()  {
    let {} = useContext(carteContext)
    const [Products, setProducts] = useState([]);
    let {addToCart,setdisplayCart,addToWishlist ,setDisplayWishlist} = useContext(carteContext)

async function addProducts(product_id){ 
 let response =  await addToCart(product_id);
 console.log(response?.data?.numOfCartItems);
 if(response?.data?.status == 'success'){
    setdisplayCart(response?.data?.numOfCartItems)
    toast.success(response?.data?.message ,  {className:'bg-main  text-white ' , duration:2000})
 }else{
    toast.error(response?.response?.data?.message)
 }
}
async function addWishlist(product_id){ 
 let response =  await addToWishlist(product_id);
 console.log(response);
 if(response?.data?.status == 'success'){
    setDisplayWishlist(response?.data?.data.length)
    toast.success(response?.data?.message ,  {className:'bg-main  text-white ' , duration:2000})
 }else{
    toast.error(response?.response?.data?.message)
 }
}



   async function getProducts(){
let {data} = await  axios.get(`https://route-ecommerce.onrender.com/api/v1/products`);
setProducts(data.data)
    }

    getProducts()
    return <>
    <div className="row g-3">
    {Products.map((product)=> <div  key={product?._id} className="col-md-2">
   
        <Link to={`/productdatalis/${product?._id}`}>
        <div className='product cursor-pointer  px-2 py-3'>
            <img className='w-100' src={product.imageCover} alt="" />
            <span className="text-main fw-bold font-sm">{product?.category?.name}</span>
            <h3 className='h6'>{product.title.split(' ').slice(0,2).join(' ')}</h3>
            <div className='d-flex justify-content-between'>
                <span className='text-muted'>{product.price} EGP</span>
                <span>
                    <i className='fas fa-star rating-color'></i>
                    {product.ratingsAverage}
                </span>

            </div>
        </div>
        </Link>
<div className='d-flex align-items-center justify-content-between mt-3'>
<i onClick={()=> addWishlist(product?._id)} className='fa-regular px-3 cursor-pointer  fa-heart fa-lg'></i>
            <button onClick={()=> addProducts(product?._id)} className="btn bg-main w-100  text-white ">+ Add</button>
</div>
    </div>)}
    </div>
    
    </>
}

 

