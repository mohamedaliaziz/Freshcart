import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './Login.module.css';
import { useFormik } from 'formik'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


export default function Login({savUserData})  {
 const [isloding, setisloding] = useState(false);
 const [messageError, setmessageError] = useState('');
//  const [messagesuccess, setmessagesuccess] = useState('');
    let navigate = useNavigate()
async function handleLogin(value){
    setisloding(true)
 let {data} = await axios.post(`https://route-ecommerce.onrender.com/api/v1/auth/signin`, value).catch((err)=>{
    setisloding(false)
 setmessageError(`${err.response.data.errors.param} : ${err.response.data.errors.msg}`)
//  setmessagesuccess(`${err}`)
console.log(err);
 })
if(data.message == 'success'){
    localStorage.setItem('userToken' , data.token);
    savUserData()
    setisloding(false)
    navigate('/')
}

console.log(data);

}
function validate(values){
    let errors = {};
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
   
   



    return errors;
}
    let formik = useFormik({
        initialValues:{
            email:'',
            password:'',
          
        },
        onSubmit:handleLogin,
        validate
    })
    return <>
    <div className='w-75 mx-auto py-4'>

<h3 className="">Login Now :</h3>

<form onSubmit={formik.handleSubmit} className=''>

{messageError.length > 0?<div className="alert alert-danger">{messageError}</div>:null}


    <label htmlFor='email'>Email</label>
    <input onBlur={formik.handleBlur}  className='form-control mb-2' onChange={formik.handleChange} value={formik.values.email} type="email" name='email' id='email' />
    {formik.errors.email && formik.touched.email?<div className='alert alert-danger '>{formik.errors.email}</div>:null}
   
    <label  htmlFor='password'>Password</label>
    <input onBlur={formik.handleBlur}  className='form-control mb-2' onChange={formik.handleChange} value={formik.values.password} type="password" name='password' id='password' />
    {formik.errors.password && formik.touched.password?<div className='alert alert-danger '>{formik.errors.password}</div>:null}


   {isloding?<button class="btn bg-main" type="button" > <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span></button>:   
    <button disabled={!(formik.isValid && formik.dirty)} type='submit' className='btn bg-main text-white'>Login</button>}
  
    
    
</form>

    </div>
    
    </>
}

 

 
