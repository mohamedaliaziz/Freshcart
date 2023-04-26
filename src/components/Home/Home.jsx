import React from 'react';
import PropTypes from 'prop-types';
import styles from './Home.module.css';
import FearuredProducts from './../FearuredProducts/FearuredProducts';
import CategorySlider from './../CategorySlider/CategorySlider';
import MainSlider from './../MainSlider/MainSlider';

export default function Home()  {
    return <>

    <MainSlider/>
    <CategorySlider/>
    <div className='mt-5'><FearuredProducts/></div>
    

    </>
}


