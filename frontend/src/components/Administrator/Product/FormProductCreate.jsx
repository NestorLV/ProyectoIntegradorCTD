import React, { useState } from "react";
import StylesApp from "../../../App.module.css"
import Styles from "./Styles.module.css";
import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';
import ModalProductSucceed from './ModalProductSucceed';
import ConfirmProductModal from "./ConfirmProductModal"
import FormProduct from "./FormProduct";
import { AxiosCrearProducto } from "../../../axiosCollection/Product/AxiosProduct";


export default function FormProductCreate({ categories, cities, features, titleModal, messageModal }) {
    const [name, setName] = useState("");
    const [selectedCategory, setSelectedCategory] = useState()
    const [address, setAddress] = useState("");
    const [selectedCity, setSelectedCity] = useState()
    const [latitude, setLatitude] = useState();
    const [longitude, setLongitude] = useState();
    const [reference, setReference] = useState("");
    const [qualification, setQualification] = useState();
    const [description, setDescription] = useState("");
    const [selectedFeatures, setSelectedFeatures] = useState([]);
    const [rules, setRules] = useState("");
    const [healthAndSecurity, setHealthAndSecurity] = useState("");
    const [cancellationPolicy, setCancellationPolicy] = useState("");
    const [imageTitle, setImageTitle] = useState()
    const [imageUrl, setImageUrl] = useState()
    const [images, setImages] = useState([])

    const [errorProduct, setErrorProduct] = useState("");

    const [errorCamposVacios, setErrorCamposVacios] = useState("")

    const [modalProductSucceedIsOpen, setModalProductSucceedIsOpen] = useState(false)
    const [modalConfirmIsOpen, setModalConfirmIsOpen] = useState(false)

    console.log(features);

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
    console.log(selectedCity);
    console.log(selectedCategory);
*/

const openModalSucceed = (() => {
    setModalProductSucceedIsOpen(true)
})
    const closeModalSucceed = () => {
        setModalProductSucceedIsOpen(false);
    };

    const openModalConfirm = (e) => {
        e.preventDefault();
        if (name && description && latitude && longitude && address && qualification && reference && selectedCategory && selectedCity && rules && healthAndSecurity && cancellationPolicy && images.length > 0 && selectedFeatures.length > 0) {
            setModalConfirmIsOpen(true)
            setErrorCamposVacios("")
        } else {
            setErrorCamposVacios("Por favor complete todos los campos")
        }

    }

    const closeModalConfirm = () =>{
        setModalConfirmIsOpen(false)
    }

    const crearProducto = () =>{
        closeModalConfirm()
        AxiosCrearProducto(name, description, latitude, longitude, address, qualification, reference, selectedCategory.value, selectedCity.value, rules, healthAndSecurity, cancellationPolicy, images, selectedFeatures, setErrorProduct, openModalSucceed)
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
                    enviarDatos={openModalConfirm} tituloBoton={"Crear"}
                    errorCamposVacios={errorCamposVacios}
                />
                <Modal open={modalConfirmIsOpen} onClose={closeModalConfirm} center>
                    <ConfirmProductModal accion="crear" setModalConfirmIsOpen={setModalConfirmIsOpen} funcionProducto={crearProducto} closeModalConfirm={closeModalConfirm}/>
                </Modal>
                <Modal open={modalProductSucceedIsOpen} onClose={closeModalSucceed} center>
                    <ModalProductSucceed title={titleModal} message={messageModal} />
                </Modal>
            </div>
        </section>
    )
}