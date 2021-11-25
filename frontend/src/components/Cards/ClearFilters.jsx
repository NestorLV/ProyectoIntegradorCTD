import React from 'react';
import Styles from './styles.module.css';

function ClearFilters({handleClean, setCategory, setCity, setTitulo, setStartDate, setEndDate, setFavourite, setSearch}) {
    
    const handleClick = () => {
        sessionStorage.removeItem("startDate");
        sessionStorage.removeItem("endDate");
        setStartDate(null);
        setEndDate(null);
        setTitulo("Recomendaciones");
        handleClean();
    }
    
    return (
        <div className={`${Styles.clearFilterContainer}`}>
            <button className={Styles.clearFilterButton} onClick={handleClick}>Limpiar filtros</button>
        </div>
    );
}

export default ClearFilters;