import React, { useState, useEffect } from "react";
import StylesApp from "../../../App.module.css";
import Styles from "./Styles.module.css";
import Spinner from "../../spinner/Spinner";
import FormProduct from "./FormProduct";
import axios from "axios"


function CreateProduct(props) {
    const baseURL = "http://localhost:8080/";

    const [optionsCategories, setOptionsCategories] = useState([])
    const [selectedCategory, setSelectedCategory] = useState()

    const [optionsCities, setOptionsCities] = useState([])
    const [selectedCity, setSelectedCity] = useState()

    const [optionsFeatures, setOptionsFeatures] = useState([])
    const [selectedFeatures, setSelectedFeatures] = useState([])
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        axios
            .get(baseURL + "categories/all")
            .then((response) => {
                setLoading(false);
                setOptionsCategories(response.data.map((category) =>  {return{id:category.id, name:category.title}}));
            })
            .catch((error) => {
                setErrorMessage(error.message);
                setLoading(false);
            });
    }, [])

    console.log(optionsCities);

    useEffect(() => {
        axios
            .get(baseURL + "cities/all")
            .then((response) => {
                setLoading(false);
                setOptionsCities(response.data.map((city) => {return {id:city.id, name:city.name}}));
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
                setOptionsFeatures(response.data.map((feature) => {return {id:feature.id, name:feature.title}}));
            })
            .catch((error) => {
                setErrorMessage(error.message);
                setLoading(false);
            });
    }, [])

console.log(optionsFeatures);

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
                            <FormProduct categories={optionsCategories} setSelectedCategory={setSelectedCategory} cities={optionsCities} setSelectedCity={setSelectedCity} features={optionsFeatures} setSelectedFeatures={setSelectedFeatures} />
                        </div>
                    </section>
                )}
            </section>
    )
}

export default CreateProduct;