import React from "react";
import Styles from "./styles.module.css";
import StylesApp from "../../App.module.css";
import Category from "./Category";
import axios from "axios";
import { useState, useEffect } from "react";

export default function Categories({handleCategory}) {
  const baseURL = "http://localhost:8080/categories/all";
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    axios
      .get(baseURL)
      .then((response) => {
        setData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setErrorMessage(error);
      });
  }, []);

  if (errorMessage && loading) {
    return (
      <div className={`${Styles.categoryContainer} ${StylesApp.delimiter}`}>
        <div className={`${Styles.categoryBlock} ${StylesApp.delimiterChild}`}>
          <h2 className={Styles.categoryBlock}>
            Categorías no disponibles - Falta la conexión con el Back
          </h2>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className={`${Styles.categoryContainer} ${StylesApp.delimiter}`}>
        <div className={`${Styles.categoryBlock} ${StylesApp.delimiterChild}`}>
          <h2>Buscar por tipo de alojamiento</h2>
          {loading ? (
            <p>Loading Data...</p>
          ) : (
            <div className={Styles.categoryBox}>
              {data.map((c) => (                
                <Category
                  key={c.id}
                  title={c.title}
                  imageUrl={c.url}
                  description={c.description}                                                                    
                  category={c.title} 
                  handleCategory={handleCategory}                
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}


