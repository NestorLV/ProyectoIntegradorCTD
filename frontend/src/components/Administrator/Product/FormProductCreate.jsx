//import Select from "react-select"
//import OptionsSelect from "./OptionsSelect";
import React, { useEffect, useState } from "react";
import StylesApp from "../../../App.module.css"
import Styles from "./Styles.module.css";
import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';
import CreateProductModal from './CreateProductModal';
import FormProduct from "./FormProduct";
//import Delete from "../icons/delete.svg"


export default function ({ categories, cities, features, titleModal, messageModal}) {
    const [name, setName] = useState("");
    const [selectedCategory, setSelectedCategory] = useState({ id: "", name: "" })
    const [address, setAddress] = useState("");
    const [selectedCity, setSelectedCity] = useState({ id: "", name: "" })
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

    const [modalCreateIsOpen, setModalCreateIsOpen] = useState(false)

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
    console.log(images);*/

    /*CONTROL DE COMPONENTES MEDIANTE HANDLES */
    /*const handleChangeName = (event) => {
        setName(event.target.value)
    }

    const handleChangeAddress = (event) => {
        setAddress(event.target.value)
    }

    const handleChangeLatitude = (event) => {
        setLatitude(event.target.value)
    }

    const handleChangeLongitude = (event) => {
        setLongitude(event.target.value)
    }

    const handleChangeReference = (event) => {
        setReference(event.target.value)
    }

    const handleChangeQualification = (event) => {
        setQualification(event.target.value)
    }

    const handleChangeDescription = (event) => {
        setDescription(event.target.value)
    }

    const handleChangeRules = (event) => {
        setRules(event.target.value)
    }

    const handleChangeHealthAndSecurity = (event) => {
        setHealthAndSecurity(event.target.value)
    }

    const handleChangeCancellationPolicy = (event) => {
        setCancellationPolicy(event.target.value)
    }

    const handleChangeImageTitle = (event) => {
        setImageTitle(event.target.value)
    }

    const handleChangeImageUrl = (event) => {
        setImageUrl(event.target.value)
    }

    function options(arrayOptions, setValor) {
        return arrayOptions.map((valor) => {
            return {
                value: `${valor.name}`,
                label: <OptionsSelect valor={valor} setValor={setValor} />,
            };
        })
    }

    const customStyles = {
        control: () => ({
            border: "1px solid rgba(0,0,0,.4)",
            borderRadius: "7px",
            boxShadow: "0px 1px 5px rgba(0, 0, 0, 0.15)",
            display: "flex",
            justifyContent: "space-between",

        }),

        placeholder: () => ({
            padding: "9px 5px"
        }),

        valueContainer: () => ({
            display: "flex",
            minWidth: "70%",
        }),
        singleValue: () => ({
            minWidth: "70%",
            padding: "9px 5px",

        }),

        input: () => ({
            opacity: 0,
            width: 0
        }),

        option: () => ({
            color: "#31363F",
            fontWeight: 700,
            padding: "2px 15px",
            ':hover': {
                color: '#F0572D',
                cursor: 'pointer',
            },
        }),

        indicatorsContainer: () => ({
            paddingTop: "11px"
        }),

        dropdownIndicator: () => ({
            color: '#F0572D',
            padding: "0 7px",
            transition: "all 1s",
            ':hover': {
                color: '#31363F',
                cursor: 'pointer',
                opacity: "0.5"
            },
        }),
    }

    const openModalCreate = (() => {
        setModalCreateIsOpen(true)
    })*/

    const closeModalCreate = () => {
        setModalCreateIsOpen(false);
    };
    
    //AxiosCrearProducto(name, description, latitude, longitude, address, qualification, reference, categoryId, cityId, rules, health, politics, setErrorProduct)
    //qualification, reference,

    /*function saveSelectedFeatures(event) {
        if (event.target.checked) {
            setSelectedFeatures([...selectedFeatures, { id: event.target.id, name: event.target.value }])

        } else {
            let index = selectedFeatures.indexOf(selectedFeatures.find(feature => feature.id == event.target.id))
            if (index != -1) {
                let aux = selectedFeatures;
                aux.splice(index, 1)
                setSelectedFeatures(aux)
            }
        }
    }

    function handleIndexImageDeleted(event) {
        console.log(event.target);
        deleteImage(event.target.id)
        console.log(event);
    }

    const handleClickImage = ((event) => {
        event.preventDefault()
        setImages([...images, { title: imageTitle, url: imageUrl }])
        setImageTitle("");
        setImageUrl("");

    })

    function deleteImage(index) {
        let aux = images;
        aux = aux.filter((image) => { return image.url !== index })
        setImages(aux);
        //console.log(images, "images");
    }

    console.log(images, "images");
    function sendData(event) {
        event.preventDefault()

    }

    let handleChangeCategory = (value) => {
        setSelectedCategory(value)
    }

    let handleChangeCity = (value) => {
        setSelectedCity(value)
    }

  
 
    let handleChangeFeature = (value) => {
        if(value.target.checked){
             setSelectedFeatures([...selectedFeatures, value])
        } else {
            let index = selectedFeatures.indexOf(selectedFeatures.find(feature => feature.title == value.target.value))
            if (index != -1) {
                let aux = selectedFeatures;
                aux = aux.filter((feature) => { return feature.title !== value.target.value })*/
                /* aux.splice(index, 1) */
                /*setSelectedFeatures(aux)
            }
        }       
        console.log(selectedFeatures, "selectedFeatures"); 
        
    }*/


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
                    setModalCreateIsOpen={setModalCreateIsOpen}
                    />
                <Modal open={modalCreateIsOpen} onClose={closeModalCreate} center>
                    <CreateProductModal title={titleModal} message={messageModal}/>
                </Modal>
            </div>
        </section>
    )
}