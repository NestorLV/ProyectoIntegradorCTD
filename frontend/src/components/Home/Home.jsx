import Categories from "../Categories/index.jsx";
import SearchBlock from "../SearchBlock/SearchBlock";
import Cards from "../Cards/index.jsx";

export default function Home(props) {
  
  props.setActiveCreate(false)
  props.setActiveLogin(false)
  
  return (
    <>
      <SearchBlock handleSearch={props.handleSearch} handleCity = {props.handleCity} />
      <Categories category={props.category} handleCategory={props.handleCategory} />
      <Cards category={props.category} search={props.search} city={props.city} clickBusqueda = {props.clickBusqueda} favourite = {props.favourite}/>
    </>
  );
}
