import React, { useEffect, useState } from "react";
import StylesApp from "../../../App.module.css"
import Styles from "./Styles.module.css";
import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';
import ModalProductSucceed from "./ModalProductSucceed";
import ConfirmProductModal from "./ConfirmProductModal"
import FormProduct from "./FormProduct";
import axios from "axios";
import tildeOk from "../icons/tildeOk.svg"

export default function FormProductUpdate({ product, categories, cities, features, titleModal, messageModal }) {
    const [name, setName] = useState("");
    const [selectedCategory, setSelectedCategory] = useState({ id: "", name: "" })
    const [address, setAddress] = useState("");
    const [selectedCity, setSelectedCity] = useState({ id: "", name: "" })
    const [latitude, setLatitude] = useState();
    const [longitude, setLongitude] = useState();
    const [reference, setReference] = useState("");
    const [qualification, setQualification] = useState({ campo: "", valido: false, error: "" });
    const [description, setDescription] = useState("");
    const [selectedFeatures, setSelectedFeatures] = useState([]);
    const [rules, setRules] = useState("");
    const [healthAndSecurity, setHealthAndSecurity] = useState("");
    const [cancellationPolicy, setCancellationPolicy] = useState("");
    const [imageTitle, setImageTitle] = useState();
    const [imageUrl, setImageUrl] = useState();
    const [images, setImages] = useState([]);
    const [errorProduct, setErrorProduct] = useState("");

    const [errorCamposVacios, setErrorCamposVacios] = useState("")

    const [modalProductSucceedIsOpen, setModalProductSucceedIsOpen] = useState(false)
    const [modalConfirmIsOpen, setModalConfirmIsOpen] = useState(false)


    /*console.log(name);
    console.log(selectedCategory);
    console.log(address);
    console.log(selectedCity);
    console.log(latitude);
    console.log(longitude);
    console.log(reference);
    console.log(qualification);
    console.log(description);
    console.log(selectedFeatures);
    console.log(rules);
    console.log(healthAndSecurity);
    console.log(cancellationPolicy);
     console.log(features);
    console.log(images);*/



    useEffect(() => {
        setName(product.name)
        setSelectedCategory(
            {
                value: `${product.category.id}`,
                label: `${product.category.title}`  //<OptionsSelect valor={product.category} setValor={setSelectedCategory} />,                
            })
        setAddress(product.address)
        setSelectedCity({
            value: `${product.city.id}`,
            label: `${product.city.name}`
        })
        setLatitude(product.latitude)
        setLongitude(product.longitude)
        setReference(product.reference)
        setQualification({ campo: product.qualification, valido: true })
        setDescription(product.description)
        setSelectedFeatures(product.features.map((feature) => { return { id: feature.id, title: feature.title } }))
        setRules(product.rules)
        setHealthAndSecurity(product.healthAndSecurity)
        setCancellationPolicy(product.cancellationPolicy)
        setImages(product.images)

    }, [product])
    console.log(qualification, "qualification");

    /*    console.log(product.images,"product.images")
        console.log(product.features,"product.features")
       console.log(product.category.title,"product.category.title") */
    //console.log(product.features, "product.features")

    const openModalSucceed = (() => {
        setModalProductSucceedIsOpen(true)
    })

    const closeModalSucceed = () => {
        setModalProductSucceedIsOpen(false);
        window.location.href = "/"
    };

    const openModalConfirm = (e) => {
        e.preventDefault();
        if (name && description && latitude && longitude && address && qualification.valido && reference && selectedCategory && selectedCity && rules && healthAndSecurity && cancellationPolicy && images.length > 0 && selectedFeatures.length > 0) {
            setModalConfirmIsOpen(true)
            setErrorCamposVacios("")
        } else {
            setErrorCamposVacios("Por favor complete todos los campos")
        }

    }

    const closeModalConfirm = () => {
        setModalConfirmIsOpen(false)
    }

    function modificarProducto() {
        closeModalConfirm()
        axios(name, description, latitude, longitude, address, qualification.campo, reference, selectedCategory.value, selectedCity.value, rules, healthAndSecurity, cancellationPolicy, images, selectedFeatures, setErrorProduct, openModalSucceed)
        //AXIOS DE MODIFICAR PRODUCTO (ENVIAR LA CALIFICACION COMO QUALIFICATION.CAMPO PORQUE EL ESTADO ESTA COMO UN OBJETO PARA HACER LA VALIDACION.
        //TAMBIEN MANDAR EL OPENMODALSUCCEED PARA QUE LO EJECUTE CUANDO RETORNA UN STATUS 200)
    }

    return (
        <section className={`${StylesApp.delimiter} ${Styles.containerPrincipal}`}>
            <div className={`${StylesApp.delimiterChild} ${Styles.containerForm}`}>
                <FormProduct
                    name={name} setName={setName}
                    selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory}
                    address={address} setAddress={setAddress}
                    selectedCity={selectedCity} setSelectedCity={setSelectedCity}
                    latitude={latitude} setLatitude={setLatitude}
                    longitude={longitude} setLongitude={setLongitude}
                    reference={reference} setReference={setReference}
                    qualification={qualification} setQualification={setQualification}
                    description={description} setDescription={setDescription}
                    selectedFeatures={selectedFeatures} setSelectedFeatures={setSelectedFeatures}
                    rules={rules} setRules={setRules}
                    healthAndSecurity={healthAndSecurity} setHealthAndSecurity={setHealthAndSecurity}
                    cancellationPolicy={cancellationPolicy} setCancellationPolicy={setCancellationPolicy}
                    imageTitle={imageTitle} setImageTitle={setImageTitle}
                    imageUrl={imageUrl} setImageUrl={setImageUrl}
                    images={images} setImages={setImages}
                    categories={categories} cities={cities} features={features}
                    setModalProductSucceedIsOpen={setModalProductSucceedIsOpen}
                    enviarDatos={openModalConfirm} tituloBoton={"Modificar"}
                    errorCamposVacios={errorCamposVacios}
                />
                <Modal open={modalConfirmIsOpen} onClose={closeModalConfirm} center>
                    <ConfirmProductModal accion="crear" setModalConfirmIsOpen={setModalConfirmIsOpen} funcionProducto={modificarProducto} closeModalConfirm={closeModalConfirm} />
                </Modal>
                <Modal open={modalProductSucceedIsOpen} onClose={closeModalSucceed} center>
                    <ModalProductSucceed title={titleModal} message={messageModal} icon={tildeOk}/>
                </Modal>
            </div>
        </section>
    )
}