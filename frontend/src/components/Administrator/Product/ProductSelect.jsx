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
        name: "",
        description: "",
        latitude: null,
        longitude: null,
        qualification: null,
        favorite: null,
        reference: "",
        category: { id: 1, title: "", description: "", url: "" },
        city: { id: 1, name: "", country: "" },
        images: [{ id: null, title: "", url: "", productId: null }],
        features: [{ id: 1, title: "", state: null }],
        rules: "",
        health: "",
        politics: "",
        address: "",
    });
    console.log(chosenProduct);
    const baseURL = "http://worldguestbooking.com.ar:8080/";

    useEffect(() => {
        axios
            .get(baseURL + "products/all")
            .then((response) => {
                setProducts(response.data);               
            })          
            .catch((error) => {
                setErrorMessage(error.message);
            });
        
    }, []);
    console.log(chosenProduct);

    const options = products.map((p) => {
        return {
            key: p.id,
            label: `${p.id} ${p.name}`,
            value: p,
        };
    })

    const customStyles = {
        control: () => ({
            border: "1px solid rgba(0,0,0,.4)",
            borderRadius: "7px",
            boxShadow: "1px 2px 4px rgba(0, 0, 0, 0.25)",
            display: "flex",
            justifyContent: "space-between",
            backgroundColor: "white",
            width: "43vw",
            minWidth: "250px",
            maxWidth: "590px",
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
    
    let handleChange = (option) => {        
        setChosenProduct(option.value);  
      
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
                        isSearchable
                        onChange={(newValue) => handleChange(newValue)}                        
                    />
                    <button onClick={() => { handleProduct(chosenProduct) }} className={`${Styles.buttonSearchProduct} ${Styles.button}`}>Buscar</button>
                </div>
            </div>
        </section>
    )
}

export default ProductSelect;