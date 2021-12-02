import React, { useState, useEffect } from "react";
import StylesApp from "../../../App.module.css";
import Styles from "./Styles.module.css";
import Spinner from "../../spinner/Spinner";
import FormProduct from "./FormProduct";
import axios from "axios"
import ProductSelect from "./ProductSelect";

function UpdateProduct(props) {
    const baseURL = "http://localhost:8080/";

    const [optionsCategories, setOptionsCategories] = useState([])
    const [optionsCities, setOptionsCities] = useState([])
    const [optionsFeatures, setOptionsFeatures] = useState([])
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");

    const [product, setProduct] = useState({
        id: null,
        name: "",
        description: "",
        latitude: null,
        longitude: null,
        qualification: null,
        favorite: null,
        reference: "",
        category: { id: null, title: "", description: "", url: "" },
        city: { id: null, name: "", country: "" },
        images: [{ id: null, title: "", url: "", productId: null }],
        features: [{ id: null, title: "", state: null }],
        rules: "",
        health: "",
        politics: "",
        address: "",
    });

    useEffect(() => {
        axios
            .get(baseURL + "categories/all")
            .then((response) => {
                setLoading(false);
                setOptionsCategories(response.data.map((category) => { return { id: category.id, name: category.title } }));
            })
            .catch((error) => {
                setErrorMessage(error.message);
                setLoading(false);
            });
    }, [])

    console.log(optionsFeatures);

    useEffect(() => {
        axios
            .get(baseURL + "cities/all")
            .then((response) => {
                setLoading(false);
                setOptionsCities(response.data.map((city) => { return { id: city.id, name: city.name } }));
            })
            .catch((error) => {
                setErrorMessage(error.message);
                setLoading(false);
            });
    }, [])

    useEffect(() => {
        axios
            .get(baseURL + "features/all")
            .then((response) => {
                setLoading(false);
                console.log(response.data);
                setOptionsFeatures(response.data.map((feature) => { return { id: feature.id, name: feature.title } }));
            })
            .catch((error) => {
                setErrorMessage(error.message);
                setLoading(false);
            });
    }, [])

    const handleProduct = (p) => {
        setProduct(p);
    }  

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
                            <h1>Modificar producto</h1>                          
                            <ProductSelect handleProduct={handleProduct}/>                           
                            <FormProduct product={product} categories={optionsCategories} cities={optionsCities} features={optionsFeatures} />
                        </div>
                    </section>
                )}
            </section>
    )
}

export default UpdateProduct;