import axios from "axios";

import { createContext, useEffect, useState } from "react";




export let carteContext = createContext();
let userToken = localStorage.getItem('userToken');
// console.log(userToken);
let headers = { token: userToken }
// console.log(headers);
export function CartContextProvider(props) {

const [gettCart, setgettCart] = useState(null);
 const [displayCart, setdisplayCart] = useState(0);
 const [displayWishlist, setDisplayWishlist] = useState(0);

async function getCart(){
    let response = await getLoggedUserCart()
    if(response?.data?.status === 'success'){
        setgettCart(response.data.data._id)
        setdisplayCart(response.data.numOfCartItems)

        console.log(response);
    }

}

    useEffect(()=>{
        getCart()
    },[])
    function addToCart(productId) {

        return axios.post(`https://route-ecommerce.onrender.com/api/v1/cart`, { productId: productId },
            { headers }
        )
            .then((response) => response)
            .catch((error) => error)
    }
    function addToWishlist(productId) {

        return axios.post(`https://route-ecommerce.onrender.com/api/v1/wishlist`, { productId: productId },
            { headers }
        )
            .then((response) => response)
            .catch((error) => error)
    }
    function getLoggedUserCart() {

        return axios.get(`https://route-ecommerce.onrender.com/api/v1/cart`,
            { headers }
        )
            .then((response) => response)
            .catch((error) => error)
    }
    function GetAllBrands() {

        return axios.get(`https://route-ecommerce.onrender.com/api/v1/brands`,
            { headers }
        )
            .then((response) => response)
            .catch((error) => error)
    }
   
    function getLoggedUserWishlist() {

        return axios.get(`https://route-ecommerce.onrender.com/api/v1/wishlist`,
            { headers }
        )
            .then((response) => response)
            .catch((error) => error)
    }
    function removeItem(productId) {

        return axios.delete(`https://route-ecommerce.onrender.com/api/v1/cart/${productId}`,
            { headers }
        )
            .then((response) => response)
            .catch((error) => error)
    }
    function removewishlist(productId) {

        return axios.delete(`https://route-ecommerce.onrender.com/api/v1/wishlist/${productId}`,
            { headers }
        )
            .then((response) => response)
            .catch((error) => error)
    }
    function updateProductCount(productId, count) {

        return axios.put(`https://route-ecommerce.onrender.com/api/v1/cart/${productId}`,
            {
                count: count
            },
            { headers }
        )
            .then((response) => response)
            .catch((error) => error)
    }
    function clearUserCart(productId) {

        return axios.delete(`https://route-ecommerce.onrender.com/api/v1/cart`,

            { headers }
        )
            .then((response) => response)
            .catch((error) => error)
    }
    function GetAllCategories() {

        return axios.get(`https://route-ecommerce.onrender.com/api/v1/categories`,


        )
            .then((response) => response)
            .catch((error) => error)
    }
    function onlinePayment(productId, shippingAddress) {

        return axios.post(`https://route-ecommerce.onrender.com/api/v1/orders/checkout-session/${productId}?url=http://localhost:3000`,
            {
                shippingAddress
            },
            {
                headers
            })
            .then((response) => response)
            .catch((error) => error)
    }

    return <>

        <carteContext.Provider value={{GetAllBrands,GetAllCategories,removewishlist,GetAllCategories,addToWishlist,setDisplayWishlist,displayWishlist,getLoggedUserWishlist,setdisplayCart ,displayCart,gettCart, addToCart, getLoggedUserCart, removeItem, updateProductCount, clearUserCart, onlinePayment }}>

            {props.children}


        </carteContext.Provider>


    </>
}