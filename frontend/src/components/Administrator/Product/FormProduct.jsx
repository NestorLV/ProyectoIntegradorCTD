import StylesApp from "../../../App.module.css"
import Styles from "./Styles.module.css";
import Select from "react-select"
import OptionsSelect from "./OptionsSelect";
import Delete from "../icons/delete.svg"

export default function FormProduct({ name, setName, selectedCategory, setSelectedCategory, address, setAddress, selectedCity, setSelectedCity, latitude, setLatitude, longitude,setLongitude, reference, setReference, qualification, setQualification, description, setDescription, selectedFeatures, setSelectedFeatures, rules, setRules, healthAndSecurity, setHealthAndSecurity, cancellationPolicy, setCancellationPolicy, imageTitle, setImageTitle, imageUrl, setImageUrl, images, setImages, categories, cities, features, setModalCreateIsOpen}){

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
                aux = aux.filter((feature) => { return feature.title !== value.target.value })
                /* aux.splice(index, 1) */
                setSelectedFeatures(aux)
            }
        }       
        console.log(selectedFeatures, "selectedFeatures"); 
        
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
    })

    return(
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
                                options={options(categories, setSelectedCategory)}
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
                                options={options(cities, setSelectedCity)}
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
                            <input type="text" name="latitude" id="latitude" value={latitude} onChange={handleChangeLatitude} />
                        </div>
                        <div className={Styles.blockInputs}>
                            <label htmlFor="longitude">Longitud</label>
                            <input type="text" name="longitude" id="longitude" value={longitude} onChange={handleChangeLongitude} />
                        </div>
                    </div>
                    <div className={Styles.containerBlockAdministrator}>
                        <div className={Styles.blockInputs}>
                            <label htmlFor="reference">Referencia</label>
                            <input type="text" name="reference" id="reference" value={reference} onChange={handleChangeReference} />
                        </div>
                        <div className={Styles.blockInputs}>
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
                                <label onClick={saveSelectedFeatures}>
                                    <input                                        
                                        onChange={event => handleChangeFeature(event)}
                                        type="checkbox"
                                        checked={selectedFeatures.find(feature => feature.id == option.id)} 
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
                                        <div className={Styles.insertedImage}>
                                            <div className={Styles.imageItem}> {image.title}</div>
                                            <div className={Styles.imageItem}> {image.url}</div>
                                        </div>
                                        <div className={Styles.deleteImage} ><img src={Delete} alt="icon delete" id={image.url} onClick={handleIndexImageDeleted} /></div>
                                    </div>
                                )
                            })}

                        </div>
                    </div>
                    <div>
                        <button onClick={openModalCreate} id={Styles.buttonCreateProduct} type="submit">Crear</button>
                    </div>
                </form>
    )
}