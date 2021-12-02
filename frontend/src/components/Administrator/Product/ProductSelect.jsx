import React, { useState, useEffect } from "react";
import Styles from "./Styles.module.css";
import Select from "react-select";
import StylesApp from "../../../App.module.css"
import axios from "axios";

function ProductSelect(props) {
    const [products, setProducts] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");

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
    },[]);

    const options = products.map((p) => {
        return {
            value: `${p.id}`,
            label: `${p.id} ${p.name}`,
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

    return (
        <section className={`${StylesApp.delimiter} ${Styles.containerPrincipal}`}>
            <div className={`${StylesApp.delimiterChild} ${Styles.containerForm} ${Styles.containerProductSelect}`}>
                <p className={Styles.titleProductSelect}>Seleccione el nombre del producto para modificar</p>
                <div className={Styles.selectProductBox}>
                    <Select
                        options={options}
                        placeholder="Seleccionar producto"
                        styles={customStyles}
                        getOptionValue={(option) => option.value}
                    />
                    <button className={`${Styles.buttonSearchProduct} ${Styles.button}`}>Buscar</button>
                </div>
            </div>
        </section>

    )
}

export default ProductSelect;