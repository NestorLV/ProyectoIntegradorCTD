import FormBooking from "./FormBooking"
import Styles from "./styles.module.css"
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import StylesApp from "../../App.module.css";
import TitleBar from "../Product/TitleBar"
import Spinner from "../spinner/Spinner";
import InfoBar from "../Product/InfoBar";

export default function Booking(props) {

    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");
    let { id } = useParams();
    console.log("id", useParams())
    const [prod, setProd] = useState({
        id: id,
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
            .get(`http://localhost:8080/products/get/${id}`)
            .then((response) => {
                setProd(response.data);
                setLoading(false);
            })
            .catch((error) => {
                setErrorMessage("No es posible mostrar la página");
            });
    }, [id]);

    if (errorMessage && loading) {
        return (
            <section className={StylesApp.delimiter}>
                <h1>{errorMessage}</h1>
            </section>
        );
    } else {

        return (
            <>
                <section className={`${Styles.booking} ${StylesApp.delimiter}`}>
                    <div className={`${Styles.dateBarChild} ${StylesApp.delimiterChild}`}>
                        {loading ? <Spinner /> : (
                            <>
                                <TitleBar category={prod.category.title} name={prod.name} goBack={props.history.goBack} />
                                <FormBooking />
                            </>
                        )}
                    </div>
                </section>
                <InfoBar health={prod.health} rules={prod.rules} politics={prod.politics} />

            </>

        )
    }
}