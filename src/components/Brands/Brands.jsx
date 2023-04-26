import React, { useContext, useState } from 'react';

import styles from './Brands.module.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { carteContext } from '../../Context/CartContext.js';
import { toast } from 'react-hot-toast';



export default function Brands()  {
    let {} = useContext(carteContext)
    const [Brands, setBrands] = useState([]);
    let {addToCart,setdisplayCart,addToWishlist ,setDisplayWishlist} = useContext(carteContext)

async function addBrands(product_id){ 
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



   async function getBrands(){
let {data} = await  axios.get(`https://route-ecommerce.onrender.com/api/v1/Brands`);
setBrands(data.data)
console.log(data.data)
    }

    getBrands()
    return <>
    <div className="row">
    {Brands.map((product)=> <div  key={product?._id} className="col-md-2 text-center ">
   
        <Link to={`/brandsDetalis/${product?._id}`}>
        <div className='product cursor-pointer  px-2 py-3'>
            <img className='w-100' src={product.image} alt="" />
            <h3 className='h6 text-main'>{product?.name?.split(' ').slice(0,2).join(' ')}</h3>

        </div>
        </Link>

    </div>)}
    </div>
    
    </>
}

 

