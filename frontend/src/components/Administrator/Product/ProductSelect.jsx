import React, { useState, useEffect } from "react";
import Styles from "./Styles.module.css";
import Select from "react-select";
import StylesApp from "../../../App.module.css"
import axios from "axios";

function ProductSelect({ handleProduct }) {
    const [errorMessage, setErrorMessage] = useState("");
    const [products, setProducts] = useState([]);
    const [chosenProduct, setChosenProduct] = useState({
        id: null,
        name: "Hotel Transilvania",
        description: "Donde tus miedos se cumplen",
        latitude: 45.709198,
        longitude: 25.600926,
        qualification: 5,
        favorite: null,
        reference: "Castillo aislado del mundo",
        category: { id: 1, title: "Hotel", description: "", url: "" },
        city: { id: 1, name: "Rumania", country: "" },
        images: [{ id: null, title: "", url: "", productId: null }],
        features: [{ id: 1, title: "wifi", state: null }],
        rules: "No beber agua",
        health: "No se respeta la salud",
        politics: "Beber sangre",
        address: "Alguna parte de Rumania",
    });

    const baseURL = "http://localhost:8080/";

    useEffect(() => {
        axios
            .get(baseURL + "products/all")
            .then((response) => {
                setProducts(response.data);
                console.log(response.data);
            })
            .catch((error) => {
                setErrorMessage(error.message);
            });
    }, []);

    const options = products.map((p) => {
        return {
            key: p.id,           
            label: `${p.id} ${p.name}`,
            value:p,
            /* getOptionValue: (option) => option.value */
            /* onClick: (e) => handleChange(e) */
            /* isOptionSelected: (p) => setChosenProduct(p),
            getOptionValue: (option) => option.value */
        };
    })

    const customStyles = {
        control: () => ({
            borderRadius: "7px",
            boxShadow: "1px 2px 4px rgba(0, 0, 0, 0.25)",
            display: "flex",
            justifyContent: "space-between",
            backgroundColor: "white",
            width: "40vw",
            minWidth: "250px",
            color: "black",
            '@media all and (max-width:415px)': {
                width: "100%"
            }
        }),

        placeholder: () => ({
            padding: "10px 10px"
        }),

        valueContainer: () => ({
            display: "flex",
            minWidth: "70%",
        }),
        singleValue: () => ({
            minWidth: "70%",
            padding: "10px 10px",

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
            paddingTop: "15px"
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

   /*  let handleChange = (e) => {
        setChosenProduct(e.target.value);
    } */

    return (
        <section className={`${StylesApp.delimiter} ${Styles.containerPrincipal}`}>
            <div className={`${StylesApp.delimiterChild} ${Styles.containerForm} ${Styles.containerProductSelect}`}>
                <p className={Styles.titleProductSelect}>Seleccione el nombre del producto para modificar</p>
                <div className={Styles.selectProductBox}>
                    <Select
                        /* onChange={handleChange}  */
                        options={options}
                        placeholder="Seleccionar producto"
                        styles={customStyles}
                        isSearchable                     
                        value={(value) => setChosenProduct(value)}                  
                        /* getOptionValue={(option) => option.value} */
                        /* onChange={(newValue) => setChosenProduct(newValue)} */
                        /* onClick={(newValue) => handleChange(newValue)} */
                        /* isOptionSelected={(option) => setChosenProduct(option.value)} */
                    />
                    <button onClick={() => { handleProduct(chosenProduct) }} className={`${Styles.buttonSearchProduct} ${Styles.button}`}>Buscar</button>
                </div>
            </div>
        </section>

    )
}

export default ProductSelect;