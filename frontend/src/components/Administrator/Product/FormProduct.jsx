import Styles from "./Styles.module.css";
import Select from "react-select"
import Delete from "../icons/delete.svg"
import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';
import ModalMessage from './ModalProductSucceed';

export default function FormProduct({ name, setName, selectedCategory, setSelectedCategory, address, setAddress, selectedCity, setSelectedCity, latitude, setLatitude, longitude, setLongitude, reference, setReference, qualification, setQualification, description, setDescription, selectedFeatures, setSelectedFeatures, rules, setRules, healthAndSecurity, setHealthAndSecurity, cancellationPolicy, setCancellationPolicy, imageTitle, setImageTitle, imageUrl, setImageUrl, images, setImages, categories, cities, features, setModalCreateIsOpen, enviarDatos, tituloBoton, errorCamposVacios, modalExpiredLoginIsOpen, setModalExpiredLoginIsOpen, modalExistedProductIsOpen, setModalExistedProductIsOpen }) {
    
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
        if (event.target.value >= 1 && event.target.value <= 5) {
            setQualification({ campo: event.target.value, valido: true, error: "" })
        } else {
            setQualification({ campo: event.target.value, valido: false, error: "Ingrese una calificación del 1 al 5." })
        }
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

    const handleChangeCategory = (value) => {        
        setSelectedCategory(value)
    }

    const handleChangeCity = (value) => {      
        setSelectedCity(value)
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

    function options(arrayOptions) {
        return arrayOptions.map((valor) => {
            return {
                value: `${valor.id}`,
                label: `${valor.name}`
            };
        })
    }

    function saveSelectedFeatures(event) {
        if (event.target.checked) {
            console.log(event.target);
            setSelectedFeatures([...selectedFeatures, { id: parseInt(event.target.id), title: event.target.value}])

        } else {
            let index = selectedFeatures.findIndex(feature => feature.id === parseInt(event.target.id))            
            if (index !== -1) {
                let aux = selectedFeatures;
                aux = aux.filter((feature) => feature.id !== parseInt(event.target.id))
                setSelectedFeatures(aux)
            }
        }
    }    

    function handleIndexImageDeleted(event) {      
        deleteImage(event.target.id);    
    }

    const handleClickImage = ((event) => {
        event.preventDefault()
        if (imageTitle && imageUrl) {
            setImages([...images, { title: imageTitle, url: imageUrl }])
            setImageTitle("");
            setImageUrl("");
        }

    })

    function deleteImage(index) {
        let aux = images;
        aux = aux.filter((image) => { return image.url !== index })
        setImages(aux);
    }

    function sendData(event) {
        event.preventDefault()
    }
    
    const closeModalExpiredLogin = () => {
        setModalExpiredLoginIsOpen(false);
        sessionStorage.setItem("log", "false")
        sessionStorage.removeItem("iniciales")
        sessionStorage.removeItem("id")
        sessionStorage.removeItem("email")
        sessionStorage.removeItem("role")
        sessionStorage.removeItem("name")
        sessionStorage.removeItem("surname")
        sessionStorage.removeItem("token")
        window.location.href = "/login"
    };

    const closeModalExistedProduct = () => {
        setModalExistedProductIsOpen(false);
    };

    return (
        <form onSubmit={sendData}>
            <div className={Styles.containerBlockAdministrator}>
                <div className={Styles.blockInputs}>
                    <label htmlFor="name">Nombre de la propiedad</label>
                    <input type="text" name="name" id="name" value={name} onChange={handleChangeName} />
                </div>
                <div className={Styles.blockInputs}>
                    <label htmlFor="category">Categoría</label>
                    <Select
                        onChange={(newValue) => handleChangeCategory(newValue)}
                        options={options(categories)}
                        placeholder="Seleccionar categoria"
                        styles={customStyles}
                        getOptionValue={option => option.value}
                        value={selectedCategory}
                    />
                </div>
            </div>
            <div className={Styles.containerBlockAdministrator}>
                <div className={Styles.blockInputs}>
                    <label htmlFor="address">Dirección</label>
                    <input type="text" name="address" id="address" value={address} onChange={handleChangeAddress} />
                </div>
                <div className={Styles.blockInputs}>
                    <label htmlFor="city">Ciudad</label>
                    <Select
                        onChange={(newValue) => handleChangeCity(newValue)}
                        options={options(cities)}
                        placeholder="Seleccionar ciudad"
                        styles={customStyles}
                        getOptionValue={(option) => option.value}
                        value={selectedCity}
                    />
                </div>
            </div>
            <div className={Styles.containerBlockAdministrator}>
                <div className={Styles.blockInputs}>
                    <label htmlFor="latitude">Latitud</label>
                    <input type="number" name="latitude" id="latitude" value={latitude} onChange={handleChangeLatitude} />
                </div>
                <div className={Styles.blockInputs}>
                    <label htmlFor="longitude">Longitud</label>
                    <input type="number" name="longitude" id="longitude" value={longitude} onChange={handleChangeLongitude} />
                </div>
            </div>
            <div className={Styles.containerBlockAdministrator}>
                <div className={Styles.blockInputs}>
                    <label htmlFor="reference">Referencia</label>
                    <input type="text" name="reference" id="reference" value={reference} onChange={handleChangeReference} />
                </div>
                <div className={Styles.blockInputs}>
                    <label htmlFor="qualification">Calificación</label>
                    <input type="number" name="qualification" id="qualification" value={qualification.campo !== "" ? parseInt(qualification.campo) : ""} onChange={handleChangeQualification} />
                    <div className={Styles.error}>{qualification.error}</div>
                </div>
            </div>
            <div className={Styles.description}>
                <label htmlFor="description">Descripción</label>
                <textarea name="description" id="description" maxLength="500" placeholder="Escribir aquí" value={description} onChange={handleChangeDescription} />
            </div>

            <div className={Styles.containerCheckbox}>
                <h3>Agregar atributos</h3>
                {features.map((option, index) => {
                    return (
                        <label onClick={saveSelectedFeatures}>
                            <input
                                onChange={event => saveSelectedFeatures(event)}
                                type="checkbox"
                                checked={selectedFeatures.find(feature => feature.id === option.id)}
                                id={index + 1}
                                value={option.name}
                            />
                            {option.name}
                        </label>
                    )
                })}
            </div>
            <div className={Styles.containerPoliticsPrincipal}>
                <h3>Políticas del producto</h3>
                <h6>(Separar las políticas por coma)</h6>
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
                <h6>(Las imágenes se cargan haciendo click en +)</h6>
                <div className={Styles.containerBlockAdministratorImage}>
                    <div className={Styles.blockInputsImages}>
                        <div className={Styles.image}>
                            <label htmlFor="titleImage">Título</label>
                            <input type="text" name="titleImage" id="titleImage" value={imageTitle} onChange={handleChangeImageTitle} />
                        </div>
                        <div className={Styles.image}>
                            <label htmlFor="urlImage">URL</label>
                            <input type="text" name="urlImage" id="urlImage" value={imageUrl} onChange={handleChangeImageUrl} />
                        </div>
                    </div>
                    <button onClick={handleClickImage}>+</button>
                </div>
                <div className={Styles.insertedImages}>
                    {images.map((image, index) => {
                        return (
                            <div className={Styles.insertedImageAndButton}>
                                <div className={`${Styles.insertedImage}`}>
                                    <input type="text" name="titleImage" id={index + 1} className={Styles.imageItem} value={image.title} />
                                    <input type="text" name="urlImage" id={index + 1} className={Styles.imageItem} value={image.url} />
                                </div>
                                <div className={Styles.deleteImage} ><img src={Delete} alt="icon delete" id={image.url} onClick={handleIndexImageDeleted} /></div>
                            </div>
                        )
                    })}
                </div>
            </div>
            <div>
                <button onClick={(e) => enviarDatos(e)} id={Styles.buttonCreateProduct} type="submit">{tituloBoton}</button>
            </div>
            <div className={Styles.error}>{errorCamposVacios}</div>
            <Modal open={modalExpiredLoginIsOpen} onClose={closeModalExpiredLogin} center>
                <ModalMessage title={"El login expiró"} message={"Por favor inicie sesión nuevamente."} closeModal={closeModalExpiredLogin} icon="X" />
            </Modal>
            <Modal open={modalExistedProductIsOpen} onClose={closeModalExistedProduct} center>
                <ModalMessage title={"El producto ya existe."} message={"Por favor, verifique los datos e intente nuevamente."} closeModal={closeModalExistedProduct} icon="X" />
            </Modal>
        </form >
    )
}