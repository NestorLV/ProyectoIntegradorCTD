import FormBooking from "./FormBooking"
import Styles from "./styles.module.css"
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import StylesApp from "../../App.module.css";
import TitleBar from "../Product/TitleBar"
import Spinner from "../spinner/Spinner";
import InfoBar from "../Product/InfoBar";
import CalendarBar from "./CalendarBar.jsx";
import ArrivalTimeBar from "./ArrivalTimeBar";
import DetailBar from "./DetailBar";


export default function Booking(props) {

    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");
    const [valueDate, setValueDate] = useState([sessionStorage.getItem("startDate") != null ? sessionStorage.getItem("startDate") : null, sessionStorage.getItem("endDate") != null ? sessionStorage.getItem("endDate") : null]);
    const [arrivalSchedule, setArrivalSchedule] = useState("")
    const [name, setName] = useState(sessionStorage.getItem("name"))
    const [surname, setSurname] = useState(sessionStorage.getItem("surname"))
    const [email, setEmail] = useState(sessionStorage.getItem("email"))
    const [city, setCity] = useState("")
    const [errorBooking, setErrorBooking] = useState("")

    let { id } = useParams();
    console.log("id", useParams())
    const [prod, setProd] = useState({
        id: id,
        name: "",
        description: "",
        latitude: null,
        longitude: null,
        qualification: null,
        favorite: null,
        reference: "",
        category: { id: null, title: "", description: "", url: "" },
        city: { id: null, name: "", country: "" },
        images: [{ id: null, title: "", url: "", productId: null }],
        features: [{ id: null, title: "", state: null }],
        rules: "",
        health: "",
        politics: "",
        address: "",
    });

    useEffect(() => {
        axios
            .get(`http://worldguestbooking.com.ar:8080/products/get/${id}`)
            .then((response) => {
                setProd(response.data);
                setLoading(false);
            })
            .catch((error) => {
                setErrorMessage("No es posible mostrar la página");
            });
    }, [id]);

    const formatDate = (date) => {
        if (date != null) {
            const dateString = date.toString();
            const arrayDate = dateString.split(" ");
            return arrayDate[2] + "/" + arrayDate[1] + "/" + arrayDate[3];
        }
        else { return "" }
    }

    console.log(formatDate(valueDate[0]));

    if (errorMessage && loading) {
        return (
            <section className={StylesApp.delimiter}>
                <h1>{errorMessage}</h1>
            </section>
        );
    } else {

        return (
            <>
                {console.log("valueDate", valueDate)}
                <section className={`${Styles.booking} ${StylesApp.delimiter}`}>
                    {loading ? <Spinner /> : (<>
                        <TitleBar category={prod.category.title} name={prod.name} goBack={props.history.goBack} />
                        <div className={`${Styles.bookingChild} ${StylesApp.delimiterChild}`}>


                           
                            <h2>Completá tus datos</h2>
                            <div className={Styles.container}>
                                <div>
                                    <FormBooking name={name} setName={setName} surname={surname} setSurname={setSurname} email={email} setEmail={setEmail} city={city} setCity={setCity} />
                                    <CalendarBar valueDate={valueDate} setValueDate={setValueDate} id={id} />
                                    <ArrivalTimeBar setArrivalSchedule={setArrivalSchedule} />
                                </div>
                                <div>
                                    <DetailBar nameUser={name} surnameUser={surname} emailUser={email} cityUser={city} setErrorBooking={setErrorBooking} errorBooking={errorBooking} id={id} image={prod.images[0].url} category={prod.category.title} city={prod.city.name} country={prod.city.country} reference={prod.reference} qualification={prod.qualification * 2} name={prod.name} checkin={formatDate(valueDate[0])} checkout={formatDate(valueDate[1])} arrivalSchedule={arrivalSchedule} />
                                </div>
                            </div>
                        </div>
                        <InfoBar health={prod.health} rules={prod.rules} politics={prod.politics} />
                    </>
                    )}
                </section>
            </>
        )
    }
}