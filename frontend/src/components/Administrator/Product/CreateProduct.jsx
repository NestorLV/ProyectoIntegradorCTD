import React, { useState, useEffect } from "react";
import StylesApp from "../../../App.module.css";
import Spinner from "../../spinner/Spinner";

function CreateProduct(props) {
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    
    return (
       /*  (errorMessage && loading) ?
            <section className={StylesApp.delimiter}>
                <h1>{errorMessage}</h1>
            </section>
            :
            <section>
                {loading ? (
                    <Spinner />
                ) : (
                    <> */
                       <h1>Crear producto</h1>
              /*       </>
                )}
            </section> */
    )
}

export default CreateProduct;