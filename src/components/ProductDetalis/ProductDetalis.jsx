import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styles from './ProductDetalis.module.css';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Slider from "react-slick";
export default function ProductDetalis() {

    const [productDetalis, setproductDetalis] = useState(null);
    let params = useParams()

    async function getProductDetails(id) {

        let { data } = await axios.get(`https://route-ecommerce.onrender.com/api/v1/products/${id}`);
        setproductDetalis(data.data)


    }
    useEffect(() => {
        getProductDetails(params.id)

    }, [])
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };
    return <>
        <div className='row py-3 align-items-center'>
            <div className='col-md-4'>
                <Slider {...settings}>
{productDetalis?.images.map((img)=> <img className='w-100' src={img} alt="" />)}
                </Slider>
                
            </div>
            <div className='col-md-8'>
                <h3>{productDetalis?.title}</h3>
                <p className='text-muted p-2'>{productDetalis?.description}</p>
                <div className='d-flex justify-content-between'>
                    <span className='text-muted'>{productDetalis?.price} EGP</span>
                    <span>
                        <i className='fas fa-star rating-color'></i>
                        {productDetalis?.ratingsAverage}
                    </span>

                </div>
                <button className="btn bg-main w-100 text-white ">+ Add</button>
            </div>
        </div>

    </>
}


