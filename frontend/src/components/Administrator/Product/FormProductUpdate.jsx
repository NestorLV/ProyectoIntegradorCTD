import React, { useEffect, useState } from "react";
import StylesApp from "../../../App.module.css"
import Styles from "./Styles.module.css";
import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';
import ModalProductSucceed from "./ModalProductSucceed";
import ConfirmProductModal from "./ConfirmProductModal"
import FormProduct from "./FormProduct";
import { AxiosModificarProducto } from "../../../axiosCollection/Product/AxiosProduct";
import tildeOk from "../icons/tildeOk.svg"

export default function FormProductUpdate({ product, categories, cities, features, titleModal, messageModal }) {
    const [name, setName] = useState("");
    const [selectedCategory, setSelectedCategory] = useState({ id: "", name: "" })
    const [address, setAddress] = useState("");
    const [selectedCity, setSelectedCity] = useState({ id: "", name: "" })
    const [latitude, setLatitude] = useState();
    const [longitude, setLongitude] = useState();
    const [reference, setReference] = useState();
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
    const [modalExpiredLoginIsOpen, setModalExpiredLoginIsOpen] = useState(false)

    useEffect(() => {
        setName(product.name)
        setSelectedCategory(
            {
                value: `${product.category.id}`,
                label: `${product.category.title}`     
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
        setHealthAndSecurity(product.health)
        setCancellationPolicy(product.politics)
        setImages(product.images)
    }, [product]) 
    
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

    const openModalExpiredLogin = (() => {
        setModalExpiredLoginIsOpen(true)
    })

    const closeModalConfirm = () => {
        setModalConfirmIsOpen(false)
    }    

    function modificarProducto() {
        closeModalConfirm();
        AxiosModificarProducto(product.id, name, description, latitude, longitude, address, qualification.campo, reference, selectedCategory.value, selectedCity.value, rules, healthAndSecurity, cancellationPolicy, images, selectedFeatures, setErrorProduct, openModalSucceed, openModalExpiredLogin)        
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
                    errorCamposVacios={errorCamposVacios} modalExpiredLoginIsOpen={modalExpiredLoginIsOpen} setModalExpiredLoginIsOpen={setModalExpiredLoginIsOpen}
                />
                <Modal open={modalConfirmIsOpen} onClose={closeModalConfirm} center>
                    <ConfirmProductModal accion="modificar el producto" setModalConfirmIsOpen={setModalConfirmIsOpen} funcionProducto={modificarProducto} closeModalConfirm={closeModalConfirm} />
                </Modal>
                <Modal open={modalProductSucceedIsOpen} onClose={closeModalSucceed} center>
                    <ModalProductSucceed title={titleModal} message={messageModal} closeModal={closeModalSucceed} icon={tildeOk}/>
                </Modal>
            </div>
        </section>
    )
}