import axios from "axios";

const baseUrl = "http://localhost:8080/"

function AxiosCrearReserva(arrivalSchedule, formatDate, checkin, checkout, id, openModalSucceed, setErrorBooking){
    axios
    .post(baseUrl + "reservations/create", {
        arrivalSchedule: arrivalSchedule,
        startDate:formatDate(checkin),
        endDate:formatDate(checkout), 
        productId:id,
        userId:sessionStorage.getItem("id")
    },{
        headers:{
            Authorization:`Bearer ${sessionStorage.getItem("token")}`
        }
    })
    .then((response) => {
        console.log(response);
        setErrorBooking("")
        sessionStorage.removeItem("startDate")
        sessionStorage.removeItem("endDate")
        openModalSucceed()
    })
    .catch((error) => {
        console.log(error);
        setErrorBooking("Lamentablemente la reserva no ha podido realizarse. Por favor, intente más tarde")
    });
    
}

export {AxiosCrearReserva}
