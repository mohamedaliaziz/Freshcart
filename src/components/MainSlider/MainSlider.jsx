import React from 'react';
import PropTypes from 'prop-types';
import styles from './MainSlider.module.css';

import slider1 from '../../images/slider-image-1.jpeg'
import slider2 from '../../images/slider-image-2.jpeg'
import slider3 from '../../images/slider-image-3.jpeg'
import  Slider  from 'react-slick';
export default function MainSlider()  {
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };
    return <>
   <div className='row gx-0 py-5'>
    <div className='col-md-9'>
    <Slider {...settings}>

        <img className='w-100' height={400} src={slider1} alt="" />
        <img className='w-100' height={400} src={slider2} alt="" />
        <img className='w-100' height={400} src={slider3} alt="" />
    </Slider>
    </div>
    <div className='col-md-3'>
    <img className='w-100' height={200} src={slider1} alt="" />
    <img className='w-100' height={200} src={slider2} alt="" />
    </div>
   </div>
    
    </>
}

 
