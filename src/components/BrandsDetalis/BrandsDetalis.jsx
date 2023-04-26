import React, { useEffect, useState } from 'react';


import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function BrandsDetalis() {

    const [BrandsDetalis, setBrandsDetalis] = useState(null);
    let params = useParams()

    async function getbrandsDetails(id) {

        let { data } = await axios.get(`https://route-ecommerce.onrender.com/api/v1/brands/${id}`);
        setBrandsDetalis(data.data)


    }
    useEffect(() => {
        getbrandsDetails(params.id)

    }, [])
  
    return <>
        <div className='row py-3 align-items-center'>
            <div className='col-md-9 m-auto text-center'>
<h2 className='text-main'>{BrandsDetalis?.name}</h2>
 <img className='w-100' src={BrandsDetalis?.image} alt="" />

            </div>

        </div>

    </>
}


