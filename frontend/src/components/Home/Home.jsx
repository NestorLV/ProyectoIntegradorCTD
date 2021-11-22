import Categories from "../Categories/Categories.jsx";
import SearchBlock from "../SearchBlock/SearchBlock";
import Cards from "../Cards/Cards";
import Spinner from "../spinner/Spinner";

export default function Home(props) {

  props.setActiveCreate(false)
  props.setActiveLogin(false)

  if(sessionStorage.getItem("log")==="false" ){
    sessionStorage.removeItem("iniciales")
    sessionStorage.removeItem("name")
    sessionStorage.removeItem("surname")
  }

  return (
    <>
      {props.loading ? (
        <Spinner />
      ) : (
        <>
          <SearchBlock handleSearch={props.handleSearch} handleCity={props.handleCity} />
          <Categories category={props.category} handleCategory={props.handleCategory} />
          <Cards category={props.category} search={props.search} city={props.city} clickBusqueda={props.clickBusqueda} favourite={props.favourite} />
        </>
      )}
    </>
  );
}
