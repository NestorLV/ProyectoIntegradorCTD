import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import StylesApp from "../../../App.module.css";
import Spinner from "../../spinner/Spinner";
import FormProductUpdate from "./FormProductUpdate";
import ProductSelect from "./ProductSelect";
import TitleBar from "../../Product/TitleBar";
import { AxiosGetCategories, AxiosGetCities, AxiosGetFeatures, AxiosGetProductById } from "../../../axiosCollection/Product/AxiosProduct.jsx"

function UpdateProduct(props) {

    const [optionsCategories, setOptionsCategories] = useState([])
    const [optionsCities, setOptionsCities] = useState([])
    const [optionsFeatures, setOptionsFeatures] = useState([])
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");
    const title = "¡Gracias!";
    const message = "Se ha actualizado exitosamente el producto";
    const [product, setProduct] = useState({
        id: null,
        name: "",
        description: null,
        latitude: null,
        longitude: null,
        qualification: null,
        favorite: null,
        reference: "",
        category: { id: null, title: "", description: "", url: "" },
        city: { id: null, name: "", country: "" },
        images: [],
        features: [{ id: null, title: "", state: null }],
        rules: "",
        health: "",
        politics: "",
        address: "",
    });

    let { id } = useParams();

    useEffect(() => {
        AxiosGetCategories(setLoading, setOptionsCategories, setErrorMessage)
        AxiosGetCities(setLoading, setOptionsCities, setErrorMessage)
        AxiosGetFeatures(setLoading, setOptionsFeatures, setErrorMessage)
        if (id) {
            AxiosGetProductById(id, setProduct, setLoading, setErrorMessage)
        }
    }, [])

    const handleProduct = (p) => {
        window.location.pathname = `/product/update/${p.id}`
        //setProduct(p);
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
                    <>
                        <TitleBar name="Administración de productos" goBack={props.goBack} />
                        <section className={StylesApp.delimiter}>
                            <div className={StylesApp.delimiterChild}>
                                <h1>Modificar producto</h1>
                                <ProductSelect handleProduct={handleProduct} />
                                <FormProductUpdate product={product} categories={optionsCategories} cities={optionsCities} features={optionsFeatures} titleModal={title} messageModal={message} />
                            </div>
                        </section>
                    </>
                )}
            </section>
    )
}

export default UpdateProduct;