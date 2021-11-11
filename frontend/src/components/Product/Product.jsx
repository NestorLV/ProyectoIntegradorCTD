import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import TitleBar from "./TitleBar";
import ScoreBar from "./ScoreBar";
import ImageBar from "./ImageBar";
import DescriptionBar from "./DescriptionBar";
import FeaturesBar from "./FeaturesBar";
import Datebar from "./DateBar";
import MapBar from "./MapBar";
import InfoBar from "./InfoBar";
import axios from "axios";
import StylesApp from "../../App.module.css";
import QualificationBar from "./QualificationBar";


function Product(props) {
    /*ESTADOS PARA EL CAROUSEL */
    const [currentImage, setCurrentImage] = useState(0);
    const [viewerIsOpen, setViewerIsOpen] = useState(false);

    const [shareIsOpen, setShareIsOpen] = useState(false);

    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");

    /*ESTADO PARA EL CALENDARIO */
    const [valueDate, setValueDate] = useState([sessionStorage.getItem("startDate")!=null?sessionStorage.getItem("startDate"):null, sessionStorage.getItem("endDate")!=null?sessionStorage.getItem("endDate"):null]);
   

    let { id } = useParams();
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
                console.log(response.data);
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
            <section>
                {loading ? (
                    <p className={StylesApp.delimiter}>Loading Data...</p>
                ) : (
                    <>
                        <TitleBar category={prod.category.title} name={prod.name} goBack={props.history.goBack} />
                        <ScoreBar reference={prod.reference} city={prod.city} qualification={prod.qualification} />
                        <ImageBar images={prod.images} viewerIsOpen={viewerIsOpen}  setViewerIsOpen={setViewerIsOpen} setShareIsOpen={setShareIsOpen} setCurrentImage={setCurrentImage} id={prod.id} shareIsOpen={shareIsOpen} />
                        <DescriptionBar city={prod.city} description={prod.description} />
                        <FeaturesBar features={prod.features} />
                        <Datebar valueDate={valueDate} setValueDate={setValueDate} />
                        {props.latitude !== null || props.longitude !== null ?
                            <MapBar city={prod.city} latitude={prod.latitude} longitude={prod.longitude} name={prod.name} address={prod.address} />
                            : null}
                        <QualificationBar />
                        <InfoBar health={prod.health} rules={prod.rules} politics={prod.politics} />
                    </>
                )}
            </section>
        );
    }
}

export default Product;
