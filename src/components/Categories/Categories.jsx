
import React, { useContext, useState } from 'react';

import styles from './Categories.module.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { carteContext } from '../../Context/CartContext.js';
import { toast } from 'react-hot-toast';



export default function Categories()  {
    
    const [Categories, setCategories] = useState([]);






   async function GetAllCategories(){
let {data} = await  axios.get(`https://route-ecommerce.onrender.com/api/v1/Categories`);
setCategories(data.data)
    }

    GetAllCategories()
    return <>
    <div className="row g-3">
    {Categories.map((product)=> <div  key={product?._id} className="col-md-2 text-center ">
   
        <Link to={`/productdatalis/${product?._id}`}>
        <div className='product cursor-pointer  px-2 py-3'>
            <img className='imgCateg w-100' src={product.image} alt="" />
            <h3 className='h4 text-main mt-2'>{product?.name?.split(' ').slice(0,2).join(' ')}</h3>

        </div>
        </Link>

    </div>)}
    </div>
    
    </>
}

 




