import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import styles from './Checkout.module.css';
import { useFormik } from 'formik';
import { carteContext } from './../../Context/CartContext';

export default function Checkout()  {
    let {onlinePayment , gettCart} =useContext(carteContext)
 async function handleSubmit(values){
   let response = await onlinePayment( gettCart , values);
   if (response?.data?.status  === 'success') {
    window.location.href = response.data.session.url;
   }
   console.log(response);
}
    let  formik = useFormik({
        initialValues:{
            details:'',
            city:'',
            phone:''
        },
        onSubmit:handleSubmit
    })
    return <>
   <div className='w-50  py-5 mx-auto '>
    <form onSubmit={formik.handleSubmit}>
        <label htmlFor='details'>detalis</label>
        <input  type="text"  value={formik.values.details} onChange={formik.handleChange} className='form-control' name='details' id='details'  />
       
        <label htmlFor='city'>city</label>
        <input type="text"  value={formik.values.city } onChange={formik.handleChange} className='form-control' name='city' id='city'  />
        
        <label htmlFor='phone'>phone</label>
        <input type="tle"  value={formik.values.phone} onChange={formik.handleChange} className='form-control' name='phone' id='phone'  />
        <button type='submit' className='btn border-main w-100 '>pay</button>
    </form>
   </div>
    
    </>
}

 
