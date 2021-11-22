import React, { useState } from "react";
import FormLogin from "./components/Forms/FormLogin.jsx"
import FormCreate from "./components/Forms/FormCreate.jsx";
import Home from "./components/Home/Home.jsx";
import LayoutPrincipal from "./layout/LayoutPrincipal";
import Product from "./components/Product/Product.jsx";
import NotFound from "./components/NotFound/NotFound.jsx";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Booking from "./components/booking/Booking.jsx";
import './App.module.css';

function App() {
  const [log, setLog] = useState(sessionStorage.getItem("log") === "true" ? true : false)
  const [activeCreate, setActiveCreate] = useState()
  const [activeLogin, setActiveLogin] = useState()
  const [category, setCategory] = useState("All")
  const [search, setSearch] = useState(false);
  const [city,setCity] = useState("");
  const [clickBusqueda, setClickBusqueda] = useState(false);
  const [favourite, setFavourite] = useState(false);
  const [iniciales, setIniciales] = useState("");
  const [userName, setUserName] =useState("");
  const [userSurname, setUserSurname] = useState("")
  const [loading, setLoading] = useState(false);
  const [bookingWithoutLogin, setBookingWithoutLogin]= useState(false)
  const [lastLocation, setLastLocation]=useState("")

  const handleCategory = (c) => {           
    setSearch(false);
    setCity("");
    setFavourite(false);
    setCategory(c);           
  }

  const handleSearch = (e) => {
    e.preventDefault();         
    setSearch(true);
    setClickBusqueda(!clickBusqueda);
  }

  const handleCity = (c) => {    
    setCity(c);       
  }

  const handleFavourite = (e) => {
    setSearch(false);
    setCity("");
    setFavourite(true);
  }

  const handleClean = () => {
    setCategory("All");
    setSearch(false);
    setCity(""); 
    setClickBusqueda(!clickBusqueda); 
    setFavourite(false);  
  }  

  const goBack=()=>{
    window.history.back()
  }
  console.log(lastLocation);

  return ( 
    <BrowserRouter>      
      <LayoutPrincipal setLastLocation={setLastLocation} setBookingWithoutLogin={setBookingWithoutLogin} setLoading={setLoading} iniciales={iniciales} userName={userName} userSurname={userSurname} isLogged = {log} activeCreate ={activeCreate} activeLogin = {activeLogin} handleClean={handleClean} handleFavourite={handleFavourite}>
        <Switch>
          <Route exact path="/">
            <Home loading={loading} setLastLocation={setLastLocation} setActiveCreate = {setActiveCreate} setActiveLogin ={setActiveLogin} category= {category} handleCategory={handleCategory} search={search} handleSearch={handleSearch} city={city} handleCity={handleCity} clickBusqueda = {clickBusqueda} favourite= {favourite}/>
          </Route>
          <Route exact path="/login"  component={() => !log? <FormLogin lastLocation={lastLocation} bookingWithoutLogin={bookingWithoutLogin} setLoading={setLoading} setLog={setLog} setActiveCreate = {setActiveCreate} setActiveLogin ={setActiveLogin}/> : <Redirect to={`${lastLocation}`}/>} />                  
          <Route exact path="/create" component={() => !log? <FormCreate setIniciales={setIniciales} setUserName={setUserName} setUserSurname={setUserSurname} setLog={setLog} setActiveCreate = {setActiveCreate} setActiveLogin ={setActiveLogin}/> : <Redirect to={`${lastLocation}`} />} />
          <Route exact path={"/product/:id"} exact render={() => <Product setBookingWithoutLogin={setBookingWithoutLogin} goBack={goBack} setLastLocation={setLastLocation} lastLocation={lastLocation}/>} />   
          <Route exact path={"/product/:id/reserva"} component={Booking}/>      
          <Route path="*"> <NotFound /> </Route>
        </Switch>
      </LayoutPrincipal>
    </BrowserRouter>
  );
}

export default App;
