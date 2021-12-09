import axios from "axios";

const baseUrl = "http://worldguestbooking.com.ar:8080/"


function AxiosCrearReserva(arrivalSchedule, formatDate, checkin, checkout, id, openModalSucceed, setErrorBooking) {
    axios
        .post(baseUrl + "reservations/create", {
            arrivalSchedule: arrivalSchedule,
            startDate: formatDate(checkin),
            endDate: formatDate(checkout),
            productId: id,
            userId: sessionStorage.getItem("id")
        }, {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem("token")}`
            }
        })
        .then((response) => {
            console.log(response.data);
            setErrorBooking("")
            openModalSucceed()
           
            axios.post(baseUrl + `email/verificacion/${sessionStorage.getItem("email")}/Reserva Confirmada/Su reserva en el alojamiento entre los días ${sessionStorage.getItem("startDate")} y ${sessionStorage.getItem("endDate")} con check-in a las ${response.data.arrivalSchedule} ha sido realizada exitosamente. Muchas gracias.`)
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.log(error.response);
            })
        })
        .catch((error) => {
            console.log(error);
            setErrorBooking("Lamentablemente la reserva no ha podido realizarse. Por favor, intente más tarde")
        });

}

/*function AxiosConfirmarCuenta(openModalSucceed) {
    axios
        .post(baseUrl + `email/verificacion/${sessionStorage.getItem("email")}/Buenas/confirmado`)
        .then((response) => {
            console.log(response);
            openModalSucceed()
        })
        .catch((error) => {
            console.log(error.response);
        })
}*/

export { AxiosCrearReserva }
