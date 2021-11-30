import React, { useState, useEffect } from "react";
import StylesApp from "../../../App.module.css";
import Spinner from "../../spinner/Spinner";

function UpdateProduct(props) {
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");
    
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
                       <h1>Modificar producto</h1>
                    </>
                )}
            </section>
    )
}

export default UpdateProduct;