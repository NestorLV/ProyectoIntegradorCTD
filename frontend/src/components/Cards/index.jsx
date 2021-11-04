import React from 'react';
import Styles from './styles.module.css';
import StylesApp from "../../App.module.css"
import Card from './Card.jsx';
import data from './data.json';

export default function Cards({category}) {     

    return (
        <div className={`${StylesApp.delimiter}`}>
            <div className={`${Styles.cardsBlock} ${StylesApp.delimiterChild}`}>
                <h2>{category === "All" ? "Recomendaciones" : "Resultados" }</h2>
                <div className={Styles.cardsBox}>
                    {data.map((e, index) =>
                        category === "All" ? <Card image={e.images.url} cardCategory={e.category.title} name={e.name} city={e.city.name} country={e.city.country} description={e.description} key={index} id={e.id} reference={e.reference} qualification={e.qualification}/> :
                        (category === e.category.title ? <Card image={e.images.url} cardCategory={e.category.title} name={e.name} city={e.city.name} country={e.city.country} description={e.description} key={index} id={e.id} reference={e.reference} qualification={e.qualification}/> : null)
                        
                    )}
                </div>
            </div>
        </div>
    );
}

