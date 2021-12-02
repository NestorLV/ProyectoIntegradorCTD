import Select from "react-select"
import OptionsSelect from "./OptionsSelect";
import React, { useState } from "react";
import CheckListFeatures from "./CheckListFeatures";
import StylesApp from "../../../App.module.css"
import Styles from "./Styles.module.css";
<<<<<<< HEAD

export default function ({ categories, setSelectedCategory, cities, setSelectedCity, features, setSelectedFeatures }) {

    //const [ optionsCategories, setOptionsCategories] = useState(["Hoteles", "Hostels", "Departamentos", "Bed and breakfast" ])

=======
import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';
import CreateProductModal from './CreateProductModal';

export default function ({ categories, setSelectedCategory, cities, setSelectedCity, features, setSelectedFeatures }) {
    const [modalCreateIsOpen, setModalCreateIsOpen] = useState(false)
>>>>>>> 530754a770a45556467620ddbc553ea3f4f40309

    function options(arrayOptions, setValor) {
        return arrayOptions.map((valor) => {
            return {
<<<<<<< HEAD
                value: `${valor}`,
                label: <OptionsSelect valor={valor} setValor={setValor} />,
=======
                value: `${valor.name}`,
                label: <OptionsSelect valor={valor.name} setValor={setValor} />,
>>>>>>> 530754a770a45556467620ddbc553ea3f4f40309
            };
        })
    }

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
            padding: "15px 10px",

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

<<<<<<< HEAD
=======
    const openModalCreate = (() => {
        setModalCreateIsOpen(true)
    })

    const closeModalCreate = () => {
        setModalCreateIsOpen(false);
    };

    //AxiosCrearProducto(name, description, latitude, longitude, address, qualification, reference, categoryId, cityId, rules, health, politics, setErrorProduct)
    //qualification, reference,

>>>>>>> 530754a770a45556467620ddbc553ea3f4f40309
    return (
        <section className={`${StylesApp.delimiter} ${Styles.containerPrincipal}`}>
            <div className={`${StylesApp.delimiterChild} ${Styles.containerForm}`}>
                <form >
                    <div className={Styles.containerBlockAdministrator}>
                        <div>
                            <label htmlFor="name">Nombre de la propiedad</label>
                            <input type="text" name="name" id="name" />
                        </div>
                        <div>
                            <label htmlFor="category">Categoría</label>
                            <Select
                                options={options(categories, setSelectedCategory)}
                                placeholder="Seleccionar categoria"
                                styles={customStyles}
                                getOptionValue={(option) => option.value}
                            />
                        </div>
                    </div>
                    <div className={Styles.containerBlockAdministrator}>
                        <div>
                            <label htmlFor="address">Dirección</label>
                            <input type="text" name="address" id="address" />
                        </div>
                        <div>
                            <label htmlFor="city">Ciudad</label>
                            <Select
                                options={options(cities, setSelectedCity)}
                                placeholder="Seleccionar ciudad"
                                styles={customStyles}
                                getOptionValue={(option) => option.value}
                            />
                        </div>
                    </div>
                    <div className={Styles.containerBlockAdministrator}>
                        <div>
                            <label htmlFor="latitude">Latitud</label>
                            <input type="text" name="latitude" id="latitude" />
                        </div>
                        <div>
                            <label htmlFor="longitude">Longitud</label>
                            <input type="text" name="longitude" id="longitude" />
                        </div>
                    </div>
<<<<<<< HEAD
                    <div className={Styles.description}>
                        <label htmlFor="description">Descripción</label>
                        <textarea name="description" id="description">Escribir aquí</textarea>
=======
                    <div className={Styles.containerBlockAdministrator}>
                        <div>
                            <label htmlFor="reference">Referencia</label>
                            <input type="text" name="reference" id="reference" />
                        </div>
                        <div>
                            <label htmlFor="qualification">Calificación</label>
                            <input type="text" name="qualification" id="qualification" />
                        </div>
                    </div>
                    <div className={Styles.description}>
                        <label htmlFor="description">Descripción</label>
                        <textarea name="description" id="description" placeholder="Escribir aquí"></textarea>
>>>>>>> 530754a770a45556467620ddbc553ea3f4f40309
                    </div>

                    <div className={Styles.containerCheckbox}>
                        <h3>Agregar atributos</h3>
                        <CheckListFeatures features={features} />
                    </div>
                    <div className={Styles.containerPoliticsPrincipal}>
                        <h3>Políticas del producto</h3>
                        <div className={Styles.containerPolitics}>
                            <div className={Styles.politics}>
                                <h5>Normas de la casa</h5>
                                <label>Descripción</label>
<<<<<<< HEAD
                                <textarea name="rules" id="rules" >Escribir aquí</textarea>
=======
                                <textarea name="rules" id="rules" placeholder="Escribir aquí"></textarea>
>>>>>>> 530754a770a45556467620ddbc553ea3f4f40309
                            </div>
                            <div className={Styles.politics}>
                                <h5>Salud y seguridad</h5>
                                <label>Descripción</label>
<<<<<<< HEAD
                                <textarea name="healthAndSecurity" id="healthAndSecurity" >Escribir aquí</textarea>
=======
                                <textarea name="healthAndSecurity" id="healthAndSecurity" placeholder="Escribir aquí"></textarea>
>>>>>>> 530754a770a45556467620ddbc553ea3f4f40309
                            </div>
                            <div className={Styles.politics}>
                                <h5>Políticas de cancelación</h5>
                                <label>Descripción</label>
<<<<<<< HEAD
                                <textarea name="cancellationPolicy" id="cancellationPolicy" >Escribir aquí</textarea>
=======
                                <textarea name="cancellationPolicy" id="cancellationPolicy" placeholder="Escribir aquí"></textarea>
>>>>>>> 530754a770a45556467620ddbc553ea3f4f40309
                            </div>
                        </div>
                    </div>
                    <div className={Styles.containerImages}>
                        <h3>Cargar imágenes</h3>
                        <input type="text" name="images" id="images" />
                    </div>
<<<<<<< HEAD

                   
                        <button type="submit">Crear</button>
                    
                </form>
=======
                    <div  >
                        <button onClick={openModalCreate} id={Styles.buttonCreateProduct} type="submit">Crear </button>
                    </div>
                </form>
                <Modal open={modalCreateIsOpen} onClose={closeModalCreate} center>
                    <CreateProductModal />
                </Modal>
>>>>>>> 530754a770a45556467620ddbc553ea3f4f40309
            </div>
        </section>
    )
}