import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './Register.module.css';
import { useFormik } from 'formik'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


export default function Register()  {
 const [isloding, setisloding] = useState(false);
 const [messageError, setmessageError] = useState('');
 const [messagesuccess, setmessagesuccess] = useState('');
    let navigate = useNavigate()
async function handleRegister(value){
    setisloding(true)
 let {data} = await axios.post(`https://route-ecommerce.onrender.com/api/v1/auth/signup`, value).catch((err)=>{
    setisloding(false)
 setmessageError(`${err.response.data.errors.param} : ${err.response.data.errors.msg}`)
 console.log(data);
 })
 
if(data.message == 'success'){
    setmessagesuccess(data.message)
    setisloding(false)
    navigate('/login')

}
console.log(data);


}
function validate(values){
    let errors = {};
    if(!values.name){
        errors.name = 'Name is Required'
    }
    else if(values.name.length < 3){
        errors.name = 'Nsmm minlength is 3'
    }
    else if(values.name.length > 20){
        errors.name = 'Nsmm maxlength is 10'
    }

    if(!values.email){
        errors.email = 'email is Required'
    }
    else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = ' email is Invalid';
      }

    if(!values.password){
        errors.password = 'password is Required'
    }
    else if (!/^[A-Z][a-z0-9]{5,10}$/i.test(values.password)) {
        errors.password = ' password mist start with uppercase...';
      }
    if(!values.rePassword){
        errors.rePassword = 'repassword is Required'
    }
    else if(values.password !== values.rePassword){
        errors.rePassword = 'passowrd and repassowrd doesnt mutch'
    }
    if(!values.phone){
        errors.phone = 'phone is Required'
    }
    else if(!/^(00201|\+201|01)[0-2,5]{1}[0-9]{8}$/.test(values.phone)){
        errors.phone = 'phone must be valid egyption phone number'
    }

   



    return errors;
}
    let formik = useFormik({
        initialValues:{
            name:'',
            phone:'',
            email:'',
            password:'',
            rePassword:''
        },
        onSubmit:handleRegister,
        validate
    })
    return <>
    <div className='w-75 mx-auto py-4'>

<h3 className="">Register Now :</h3>

<form onSubmit={formik.handleSubmit} className=''>

{messageError.length > 0?<div className="alert alert-danger">{messageError}</div>:null}

    <label htmlFor='name'>Name</label>
    <input onBlur={formik.handleBlur} className='form-control mb-2' onChange={formik.handleChange} value={formik.values.name} type="text" name='name' id='name' />
    {formik.errors.name && formik.touched.name?<div className='alert alert-danger '>{formik.errors.name}</div>:null}
    
    <label htmlFor='email'>Email</label>
    <input onBlur={formik.handleBlur}  className='form-control mb-2' onChange={formik.handleChange} value={formik.values.email} type="email" name='email' id='email' />
    {formik.errors.email && formik.touched.email?<div className='alert alert-danger '>{formik.errors.email}</div>:null}
   
    <label  htmlFor='password'>Password</label>
    <input onBlur={formik.handleBlur}  className='form-control mb-2' onChange={formik.handleChange} value={formik.values.password} type="password" name='password' id='password' />
    {formik.errors.password && formik.touched.password?<div className='alert alert-danger '>{formik.errors.password}</div>:null}
    <label htmlFor='rePassword'>rePassword</label>
    <input onBlur={formik.handleBlur}  className='form-control mb-2' onChange={formik.handleChange} value={formik.values.rePassword} type="password" name='rePassword' id='rePassword' />
    {formik.errors.rePassword && formik.touched.rePassword?<div className='alert alert-danger '>{formik.errors.rePassword}</div>:null}
    <label htmlFor='phone'>Phone</label>
    <input onBlur={formik.handleBlur}  className='form-control mb-2' onChange={formik.handleChange} value={formik.values.phone} type="tel" name='phone' id='phone' />
    {formik.errors.phone && formik.touched.phone?<div className='alert alert-danger '>{formik.errors.phone}</div>:null}
   {isloding?<button class="btn bg-main" type="button" > <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span></button>:   
    <button disabled={!(formik.isValid && formik.dirty)} type='submit' className='btn bg-main text-white'>Regoster</button>}
     
     {messagesuccess.length > 0 ? <div className=' text-center text-success  fs-2'>success</div>:null}
    
    
</form>

    </div>
    
    </>
}

 
