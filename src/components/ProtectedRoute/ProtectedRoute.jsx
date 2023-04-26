import React from 'react';
import PropTypes from 'prop-types';
import styles from './ProtectedRoute.module.css';
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute(props)  {
    if(localStorage.getItem('userToken') == null){

      return  <Navigate  to={'/Login'}/>
    }else{
        return props.children;
    }

}

 
