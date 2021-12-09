import React, { useState } from "react";
import FormLogin from "./components/Forms/FormLogin.jsx"
import FormCreate from "./components/Forms/FormCreate.jsx";
import Home from "./components/Home/Home.jsx";
import LayoutPrincipal from "./layout/LayoutPrincipal";
import Product from "./components/Product/Product.jsx";
import UpdateProduct from "./components/Administrator/Product/UpdateProduct.jsx";
import NotFound from "./components/NotFound/NotFound.jsx";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Booking from "./components/booking/Booking.jsx";
import './App.module.css';
import CreateProduct from "./components/Administrator/Product/CreateProduct";
import MyBookings from "./components/MyBookings/MyBookings.jsx";

function App() {
  
  const [log, setLog] = useState(sessionStorage.getItem("log") === "true" ? true : false)
  const [activeCreate, setActiveCreate] = useState()
  const [activeLogin, setActiveLogin] = useState()
  const [category, setCategory] = useState("All")
  const [search, setSearch] = useState(false);
  const [city,setCity] = useState("");
  const [clickBusqueda, setClickBusqueda] = useState(false);
  const [clickSeeFavourites, setClickSeeFavourites] = useState(false);
  const [favourite, setFavourite] = useState(false);
  const [iniciales, setIniciales] = useState("");
  const [userName, setUserName] =useState("");
  const [userSurname, setUserSurname] = useState("")
  const [loading, setLoading] = useState(false);
  const [bookingWithoutLogin, setBookingWithoutLogin]= useState(false)
  const [lastLocation, setLastLocation]=useState("") 
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [productoErroneo, setProductoErroneo] = useState(sessionStorage.getItem("productoErroneo") ? true : false)

  const role = sessionStorage.getItem("role");

  const handleCategory = (c) => {       
    setFavourite(false);
    setCategory(c);           
  }

  const handleSearch = (e) => {
    e.preventDefault();        
    setSearch(true);
    setClickBusqueda((prevState)=>!prevState);
  }

  const handleCity = (c) => {    
    setCity(c);       
  }

  const handleFavourite = () => {
    setSearch(false);
    setCity("");
    setFavourite(true);
    setClickSeeFavourites((prevState)=>!prevState);    
  }

  const handleClean = () => {
    setCategory("All");
    setSearch(false);
    setCity(""); 
    setClickBusqueda(prevState => !prevState); 
    setFavourite(false);  
  }  

  const goBack=()=>{
    window.history.back()
  } 

  return ( 
    <BrowserRouter>      
      <LayoutPrincipal setLastLocation={setLastLocation} setBookingWithoutLogin={setBookingWithoutLogin} setLoading={setLoading} iniciales={iniciales} userName={userName} userSurname={userSurname} isLogged = {log} activeCreate ={activeCreate} activeLogin = {activeLogin} handleClean={handleClean} handleFavourite={handleFavourite}>
        <Switch>
          <Route exact path="/">
            <Home productoErroneo={productoErroneo} setProductoErroneo={setProductoErroneo} loading={loading} setLastLocation={setLastLocation} setActiveCreate = {setActiveCreate} setActiveLogin ={setActiveLogin} category= {category} handleCategory={handleCategory} search={search} handleClean={handleClean} handleSearch={handleSearch} city={city} handleCity={handleCity} clickBusqueda = {clickBusqueda} favourite= {favourite} clickSeeFavourites = {clickSeeFavourites} setCategory={setCategory} setCity={setCity} setStartDate={setStartDate} setEndDate={setEndDate} startDate={startDate} endDate={endDate} setFavourite={setFavourite} setSearch={setSearch} />
          </Route>
          <Route exact path="/login"  component={() => !log? <FormLogin lastLocation={lastLocation} bookingWithoutLogin={bookingWithoutLogin} setLoading={setLoading} setLog={setLog} setActiveCreate = {setActiveCreate} setActiveLogin ={setActiveLogin}/> : <Redirect to={`${lastLocation}`}/>} />                  
          <Route exact path="/create" component={() => !log? <FormCreate lastLocation={lastLocation} setIniciales={setIniciales} setUserName={setUserName} setUserSurname={setUserSurname} setLog={setLog} setActiveCreate = {setActiveCreate} setActiveLogin ={setActiveLogin}/> : <Redirect to={`${lastLocation}`} />} />
          <Route exact path={"/product/create"} component={() => role === "ADMIN" && <CreateProduct goBack={goBack}/>} />
          <Route exact path={"/product/update/:id"} component={() => role === "ADMIN" && <UpdateProduct goBack={goBack}/>} />
          <Route exact path={"/product/update"} component={() => role === "ADMIN" && <UpdateProduct goBack={goBack}/>} />
          <Route exact path={"/product/:id"} render={() => <Product setBookingWithoutLogin={setBookingWithoutLogin} goBack={goBack} setLastLocation={setLastLocation} lastLocation={lastLocation} />} />   
          <Route exact path={"/product/:id/reserva"} component={Booking}/>    
          <Route exact path={"/mybookings"} component={() => <MyBookings goBack={goBack}/>}/>    
          
          <Route path="*"> <NotFound /> </Route>
        </Switch>
      </LayoutPrincipal>
    </BrowserRouter>
  );
}

export default App;
