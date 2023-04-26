import React, { useContext, useState, useEffect } from 'react';

import styles from './Wishlist.module.css';
import { carteContext } from '../../Context/CartContext';
import { toast } from 'react-hot-toast';
import { Link } from 'react-router-dom';

export default function Wishlist() {


    const [WishlistDetails, setWishlistDetails] = useState(null);
    let { getLoggedUserWishlist, removewishlist ,addToCart ,setdisplayCart, setDisplayWishlist } = useContext(carteContext);
    async function getWishlist() {
        let response = await getLoggedUserWishlist()
        console.log(response.data?.data)
        if (response?.data?.status == 'success') {
            setWishlistDetails(response?.data?.data)

        }
    }
    async function addProducts(product_id){ 
        let response =  await addToCart(product_id);
        // console.log(response?.data?.numOfCartItems);
        if(response?.data?.status == 'success'){
           setdisplayCart(response?.data?.numOfCartItems)
           toast.success(response?.data?.message ,  {className:'bg-main  text-white ' , duration:2000})
        }else{
           toast.error(response?.response?.data?.message)
        }
       }
    async function deleteItem(productId) {
        let response = await removewishlist(productId);
        console.log(response);
        setDisplayWishlist(response?.data?.data.length)
        setWishlistDetails(response.data.data)
        console.log(response.data.data)
        getWishlist()
        toast.success('product removed', { className: 'bg-main  text-white ', duration: 2000 })
    }

    useEffect(() => {
        getWishlist()
    },[])

    return <>
        {WishlistDetails ? <div  className='bg-main-light p-4 my-4 bg-light'>
            <h3> Wishlist : </h3><div  className='row align-items-center border-bottom py-2 my-2'>

            {WishlistDetails?.map((product) => <div key={product?._id} className='col-md-2 '>
                    <img className='w-100' src={product?.imageCover} alt="" />

                 <div className='my-2'>
                 <h6 className="">{product?.title?.split(' ').slice(0,2).join(' ')}</h6>
                            <h6 className="text-main"> Price : {product?.price}</h6>
                 </div>
                            <button onClick={()=> addProducts(product?._id)} className="btn bg-main w-100  text-white ">+ Add</button>

                            <button onClick={() => deleteItem(product?._id)} className='btn btn-danger w-100 text-white mt-1'> <i className='fa-regular fa-trash-can'></i> Remove</button>

                        </div>
                        )}
            </div>


        </div> : null}


    </>
}


