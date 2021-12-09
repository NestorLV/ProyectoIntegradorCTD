import React, { useState, useEffect } from "react";
import StylesApp from "../../../App.module.css";
import Spinner from "../../spinner/Spinner";
import FormProductCreate from "./FormProductCreate";
import TitleBar from "../../Product/TitleBar";
import { AxiosGetCategories, AxiosGetCities, AxiosGetFeatures } from "../../../axiosCollection/Product/AxiosProduct.jsx"

function CreateProduct(props) {
    const [optionsCategories, setOptionsCategories] = useState([])
    const [optionsCities, setOptionsCities] = useState([])
    const [optionsFeatures, setOptionsFeatures] = useState([])
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");
    const title = "¡Gracias!";
    const message = "Se ha creado exitosamente el producto";

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
                    <>
                        <TitleBar name="Administración de productos" goBack={props.goBack} />
                        <section className={StylesApp.delimiter}>
                            <div className={StylesApp.delimiterChild}>
                                <h1>Crear producto</h1>
                                <FormProductCreate categories={optionsCategories} cities={optionsCities} features={optionsFeatures} titleModal={title} messageModal={message} />
                            </div>
                        </section>
                    </>
                )}
            </section>
    )
}

export default CreateProduct;