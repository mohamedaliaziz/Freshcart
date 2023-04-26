import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styles from './CategorySlider.module.css';
import Slider from "react-slick";
import axios from 'axios';

export default function CategorySlider()  {
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 7,
        slidesToScroll: 1,
        arrows:false,
        autoplay:true,

    };
    const [categories, setcategories] = useState([]);
    async function getcategories(){
 let {data} = await  axios.get(`https://route-ecommerce.onrender.com/api/v1/categories`);
 setcategories(data.data)
     }
     getcategories()
    return <>
    <Slider { ...settings} autoplaySpeed={1000}>
{categories.map((category)=> <div key={category._id}>
<img className='w-100' height={200}  src={category.image} alt="" />
</div>)}
    </Slider>

    </>
}


