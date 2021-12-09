import React, { useState, useEffect } from 'react';
import { AxiosGetProductosFavoritos } from '../../axiosCollection/Cards/AxiosCards';

export default function ConsultarLike(idProd) {

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [titulo, setTitulo] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
    AxiosGetProductosFavoritos(setData, setLoading, setTitulo, setErrorMessage);
    }, []);

    console.log(data, "data fav"); 
    return  data.find(productFav => productFav.id === idProd) ? true :  false;
}
