import Select from "react-select"
import OptionsSelect from "./OptionsSelect";
import React, { useEffect, useState } from "react";
import StylesApp from "../../../App.module.css"
import Styles from "./Styles.module.css";
import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';
import CreateProductModal from './CreateProductModal';
import Delete from "../icons/tildeOk.svg"

export default function ({ product, categories, cities, features }) {
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
    const handleChangeName = (event) => {
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

    useEffect(() => {
        if (product) {
            setName(product.name)            
            setSelectedCategory({ id: product.category.id, name: product.category.title })
            setAddress(product.address)
            setSelectedCity({ id: product.city.id, name: product.city.name })
            setLatitude(product.latitude)
            setLongitude(product.longitude)
            setReference(product.reference)
            setQualification(product.qualification)
            setDescription(product.description)
            setSelectedFeatures(product.features)
            setRules(product.rules)
            setHealthAndSecurity(product.healthAndSecurity)
            setCancellationPolicy(product.cancellationPolicy)
            setImages(product.images)
        }
    }, [product])

    console.log(product.images,"product.images")
    console.log(product.features,"product.features")
    console.log(product.category.title,"product.category.title")

    const customStyles = {
        control: () => ({
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

    const handleClickImage = ((event) => {
        event.preventDefault()
        setImages([...images, { title: imageTitle, url: imageUrl }])
        setImageTitle("");
        setImageUrl("");
        //console.log(event);
        //setImage({ title: "", url: "" })

    })

    const openModalCreate = (() => {
        setModalCreateIsOpen(true)
    })

    const closeModalCreate = () => {
        setModalCreateIsOpen(false);
    };

    //AxiosCrearProducto(name, description, latitude, longitude, address, qualification, reference, categoryId, cityId, rules, health, politics, setErrorProduct)
    //qualification, reference,



    function saveSelectedFeatures(event) {
        if (event.target.checked) {
            setSelectedFeatures([...selectedFeatures, { id: event.target.id, name: event.target.value }])

        } else {
            let index = selectedFeatures.indexOf(selectedFeatures.find(feature => feature.id == event.target.id))
            if (index != -1) {
                let aux = selectedFeatures;
                aux.splice(index, 1)
                setSelectedFeatures(aux)
            }
            //console.log("form product false");
            //console.log(index, "index");
        }
    }

    function handleTacho(event){
        setTacho(event.target.id)
    }

    const[tacho, setTacho]=useState()

    useEffect((tacho)=>{
        deleteImage(tacho)
    }, [tacho])

    function deleteImage(tacho){
        let aux = images;
        aux.splice(tacho, 1)
        setImages(aux)
    }

    console.log(images, "images");
    function sendData(event) {
        event.preventDefault()

    }

    return (
        <section className={`${StylesApp.delimiter} ${Styles.containerPrincipal}`}>
            <div className={`${StylesApp.delimiterChild} ${Styles.containerForm}`}>
                <form onSubmit={sendData}>
                    <div className={Styles.containerBlockAdministrator}>
                        <div>
                            <label htmlFor="name">Nombre de la propiedad</label>
                            <input type="text" name="name" id="name" value={name} onChange={handleChangeName} />
                        </div>
                        <div>
                            <label htmlFor="category">Categoría</label>
                            <Select
                                options={options(categories, setSelectedCategory)}
                                placeholder="Seleccionar categoria"
                                styles={customStyles}
                                getOptionValue={selectedCategory}
                                /* value={selectedCategory} */
                            />
                        </div>
                    </div>
                    <div className={Styles.containerBlockAdministrator}>
                        <div>
                            <label htmlFor="address">Dirección</label>
                            <input type="text" name="address" id="address" value={address} onChange={handleChangeAddress} />
                        </div>
                        <div>
                            <label htmlFor="city">Ciudad</label>
                            <Select
                                options={options(cities, setSelectedCity)}
                                placeholder="Seleccionar ciudad"
                                styles={customStyles}
                                getOptionValue={(option) => option.value}
                                value={selectedCategory}
                            />
                        </div>
                    </div>
                    <div className={Styles.containerBlockAdministrator}>
                        <div>
                            <label htmlFor="latitude">Latitud</label>
                            <input type="text" name="latitude" id="latitude" value={latitude} onChange={handleChangeLatitude} />
                        </div>
                        <div>
                            <label htmlFor="longitude">Longitud</label>
                            <input type="text" name="longitude" id="longitude" value={longitude} onChange={handleChangeLongitude} />
                        </div>
                    </div>
                    <div className={Styles.containerBlockAdministrator}>
                        <div>
                            <label htmlFor="reference">Referencia</label>
                            <input type="text" name="reference" id="reference" value={reference} onChange={handleChangeReference} />
                        </div>
                        <div>
                            <label htmlFor="qualification">Calificación</label>
                            <input type="text" name="qualification" id="qualification" value={qualification} onChange={handleChangeQualification} />
                        </div>
                    </div>
                    <div className={Styles.description}>
                        <label htmlFor="description">Descripción</label>
                        <textarea name="description" id="description" placeholder="Escribir aquí" value={description} onChange={handleChangeDescription} />
                    </div>

                    <div className={Styles.containerCheckbox}>
                        <h3>Agregar atributos</h3>
                        {features.map((option, index) => {
                            return (
                                <label onClick={saveSelectedFeatures}><input type="checkbox" id={index + 1} value={option.name} /> {option.name}</label>
                            )
                        })}
                    </div>
                    <div className={Styles.containerPoliticsPrincipal}>
                        <h3>Políticas del producto</h3>
                        <div className={Styles.containerPolitics}>
                            <div className={Styles.politics}>
                                <h5>Normas de la casa</h5>
                                <label>Descripción</label>
                                <textarea name="rules" id="rules" placeholder="Escribir aquí" value={rules} onChange={handleChangeRules} />
                            </div>
                            <div className={Styles.politics}>
                                <h5>Salud y seguridad</h5>
                                <label>Descripción</label>
                                <textarea name="healthAndSecurity" id="healthAndSecurity" placeholder="Escribir aquí" value={healthAndSecurity} onChange={handleChangeHealthAndSecurity} />
                            </div>
                            <div className={Styles.politics}>
                                <h5>Políticas de cancelación</h5>
                                <label>Descripción</label>
                                <textarea name="cancellationPolicy" id="cancellationPolicy" placeholder="Escribir aquí" value={cancellationPolicy} onChange={handleChangeCancellationPolicy} />
                            </div>
                        </div>
                    </div>
                    <div className={Styles.containerImages}>
                        <h3>Cargar imágenes</h3>
                        <div className={Styles.containerBlockAdministrator}>
                            <div className={Styles.image}>
                                <label htmlFor="titleImage">Título</label>
                                <input type="text" name="titleImage" id="titleImage" value={imageTitle} onChange={handleChangeImageTitle} />
                            </div>
                            <div className={Styles.image}>
                                <label htmlFor="urlImage">URL</label>
                                <input type="text" name="urlImage" id="urlImage" value={imageUrl} onChange={handleChangeImageUrl} />
                            </div>
                            <button onClick={handleClickImage}>+</button>
                        </div>
                        <div className={Styles.insertedImages}>
                            {images.map((image, index) => {
                                return (
                                    <div className={Styles.insertedImage}>
                                        <input className={Styles.imageItem} value={image.title}/> 
                                        <div className={Styles.imageItem}> {image.url} </div>
                                        <div className={Styles.deleteImage} ><img src={Delete} alt="icon delete" id={index} onClick={handleTacho} /></div>
                                    </div>
                                )
                            })}

                        </div>
                    </div>
                    <div>
                        <button onClick={openModalCreate} id={Styles.buttonCreateProduct} type="submit">Crear</button>
                    </div>
                </form>
                <Modal open={modalCreateIsOpen} onClose={closeModalCreate} center>
                    <CreateProductModal />
                </Modal>
            </div>
        </section>
    )
}