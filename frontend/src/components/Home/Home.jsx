import Categories from "../Categories/Categories.jsx";
import SearchBlock from "../SearchBlock/SearchBlock";
import Cards from "../Cards/Cards";
import Spinner from "../spinner/Spinner";
import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';
import ModalProductoErroneo from "../Administrator/Product/ModalProductSucceed";
import { useEffect } from "react";

export default function Home(props) {

  /* props.setActiveCreate(false)
  props.setActiveLogin(false)
 */
  useEffect(() => {
    props.setActiveCreate(false)
    props.setActiveLogin(false)
  }, [props])


  if (sessionStorage.getItem("log") === "false" && !props.loading) {
    sessionStorage.removeItem("iniciales")
    sessionStorage.removeItem("name")
    sessionStorage.removeItem("surname")
  }

  const closeModal = () => {
    props.setProductoErroneo(false)
    sessionStorage.removeItem("productoErroneo")
  };

  return (
    <>
      {props.loading ? (
        <Spinner />
      ) : (
        <>
          <SearchBlock handleSearch={props.handleSearch} handleCity={props.handleCity} city={props.city} setStartDate={props.setStartDate} setEndDate={props.setEndDate} startDate={props.startDate} endDate={props.endDate} />
          <Categories category={props.category} handleCategory={props.handleCategory} />
          <Cards setLastLocation={props.setLastLocation} category={props.category} handleClean={props.handleClean} search={props.search} city={props.city} clickBusqueda={props.clickBusqueda} favourite={props.favourite} clickSeeFavourites={props.clickSeeFavourites} setCategory={props.setCategory} setCity={props.setCity} setStartDate={props.setStartDate} setEndDate={props.setEndDate} propStartDate={props.startDate} propEndDate={props.endDate} setFavourite={props.setFavourite} setSearch={props.setSearch} />
          <Modal open={props.productoErroneo} onClose={closeModal} center>
            <ModalProductoErroneo title={"Error"} message={"El producto no existe."} closeModal={closeModal} icon="X"/>
          </Modal>
        </>
      )}
    </>
  );
}
