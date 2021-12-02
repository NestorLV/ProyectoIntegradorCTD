import axios from "axios"
import { useState, useEffect } from "react";
import FormProduct from "./FormProduct";

export default function Product(){

    const baseURL = "http://localhost:8080/";

    const [ optionsCategories, setOptionsCategories ] = useState([])
    const [ selectedCategory, setSelectedCategory ] = useState()

    const [ optionsCities, setOptionsCities ] = useState([])
    const [ selectedCity, setSelectedCity ] = useState()

    const [ optionsFeatures, setOptionsFeatures ] = useState([])
    const [ selectedFeatures, setSelectedFeatures ] = useState([])

    console.log(optionsCities);
    console.log(selectedCity);

    useEffect(()=>{
        axios
        .get(baseURL + "categories/all")
        .then((response) => {
          setOptionsCategories(response.data.map((category)=>category.title));
        })
        .catch((error) => {
          console.log(error);
        });
    },[])

    useEffect(()=>{
        axios
        .get(baseURL + "cities/all")
        .then((response) => {
          setOptionsCities(response.data.map((city)=>city.name));
        })
        .catch((error) => {
          console.log(error);
        });
    },[])

    useEffect(()=>{
      axios
      .get(baseURL + "features/all")
      .then((response) => {
        setOptionsFeatures(response.data.map((feature)=>feature.title));
      })
      .catch((error) => {
        console.log(error);
      });
  },[])
    

    return(
        <FormProduct categories={optionsCategories} setSelectedCategory={setSelectedCategory} cities={optionsCities} setSelectedCity={setSelectedCity} features={optionsFeatures} setSelectedFeatures={setSelectedFeatures}/>
    )
}