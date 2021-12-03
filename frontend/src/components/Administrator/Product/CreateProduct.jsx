import React, { useState, useEffect } from "react";
import StylesApp from "../../../App.module.css";
import Styles from "./Styles.module.css";
import Spinner from "../../spinner/Spinner";
import FormProduct from "./FormProduct";
import {AxiosGetCategories, AxiosGetCities, AxiosGetFeatures} from "../../../axiosCollection/Product/AxiosProduct.jsx"



function CreateProduct(props) {
    const baseURL = "http://localhost:8080/";

    const [optionsCategories, setOptionsCategories] = useState([])
    const [optionsCities, setOptionsCities] = useState([])
    const [optionsFeatures, setOptionsFeatures] = useState([])
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");
    
   
    useEffect(() => {
        AxiosGetCategories(setLoading, setOptionsCategories, setErrorMessage) 
        AxiosGetCities(setLoading, setOptionsCities, setErrorMessage)
        AxiosGetFeatures(setLoading, setOptionsFeatures, setErrorMessage) 
    }, [])


    return (
        (errorMessage && loading) ?
            <section className={StylesApp.delimiter}>
                <h1>{errorMessage}</h1>
            </section>
            :
            <section>
                {loading ? (
                    <Spinner />
                ) : (
                    <section className={StylesApp.delimiter}>
                        <div className={StylesApp.delimiterChild}>
                            <h1>Crear producto</h1>
                            <FormProduct categories={optionsCategories} cities={optionsCities} features={optionsFeatures} />
                        </div>
                    </section>
                )}
            </section>
    )
}

export default CreateProduct;