import React, { useContext, useState, useEffect } from 'react';

import styles from './Cart.module.css';
import { carteContext } from '../../Context/CartContext';
import { toast } from 'react-hot-toast';
import { Link } from 'react-router-dom';

export default function Cart() {

    const [cartDetails, setcartDetails] = useState(null);
    let { getLoggedUserCart, removeItem ,updateProductCount ,clearUserCart , setdisplayCart} = useContext(carteContext);
    async function getCart() {
        let response = await getLoggedUserCart()
        if (response?.data?.status == 'success') {
            setcartDetails(response.data.data)

        }
    }
    async function deleteItem(productId) {
        let response = await removeItem(productId);
        console.log(response);
        setdisplayCart(response?.data?.numOfCartItems)
        setcartDetails(response.data.data)
        toast.success('product removed', { className: 'bg-main  text-white ', duration: 2000 })
    }
    async function updateProductQuantity(productId , count) {
        let response = await updateProductCount(productId ,count);
        console.log(response);
        setcartDetails(response.data.data)
        toast.success('product ounte updated', { className: 'bg-main  text-white ', duration: 2000 })
    }
    async function clearProduct() {
        let response = await clearUserCart();
        console.log(response);
        setdisplayCart(response?.data?.numOfCartItems)
        setcartDetails(response.data.data)
        toast.success('Deleted all successfully', { className: 'bg-main  text-white ', duration: 2000 })
    }
    useEffect(() => {
        getCart()
    }, [])

    return <>
        {cartDetails ? <div className='bg-bg-main-light p-4 my-4 bg-light'>
            <h3>shop cart : </h3>
            <h6 className="text-main">Total Cart Price : {cartDetails.totalCartPrice} EGP</h6>
            <button onClick={clearProduct} className='btn btn-danger w-100'>DELETE ALL</button>
            {cartDetails.products.map((product) => <div key={product.product._id} className='row align-items-center border-bottom py-2 my-2'>

                <div className='col-md-1'>
                    <img className='w-100' src={product.product.imageCover} alt="" />
                </div>
                <div className='col-md-11'>
                    <divc className='row'>
                        <div className='col-md-10'>
                            <h6 className="">{product.product.title}</h6>
                            <h6 className="text-main"> Price : {product.price}</h6>
                            <button onClick={() => deleteItem(product.product._id)} className='btn btn-danger m-0 p-0'> <i className='fa-regular fa-trash-can'></i> Remove</button>
                        </div>
                        <div className='col-md-2 d-flex justify-content-between align-items-center'>
                            <div onClick={()=> updateProductQuantity(product.product._id , product.count+1)} className='btn  btn-success btn-sm'>+</div>
                            <span className=' '>{product.count}</span>
                            <div onClick={()=> updateProductQuantity(product.product._id , product.count-1)} className='btn btn-danger btn-sm'>-</div>
                        </div>
                    </divc>
                </div>
            </div>)}

            <button className='btn bg-main w-100 '>
                <Link className='text-white w-100  d-block' to={'/checkout'}>
                checkout
                </Link>
            </button>
        </div> : null}


    </>
}


