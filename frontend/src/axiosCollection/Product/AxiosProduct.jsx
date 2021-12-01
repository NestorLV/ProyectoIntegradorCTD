import axios from "axios";

function AxiosGetProductoPorId(id, setProd, setLoading, setErrorMessage) {
    axios
        .get(`http://localhost:8080/products/get/${id}`)
        .then((response) => {
            setProd(response.data);
            setLoading(false);
        })
        .catch((error) => {
            setErrorMessage("No es posible mostrar la página");
        });
}

function AxiosCalificarProducto(starIndex, id, setCalificacion_text, setErrorMessage) {
    axios
        .post("http://localhost:8080/products/scores/create", {
            score: starIndex,
            userEmail: sessionStorage.getItem('email'),
            productId: id
        })
        .then((response) => {
            if (response.status === 200) {
                setCalificacion_text(`Se envió correctamente la puntuación de: ${starIndex}`);
            }

        })
        .catch((error) => {
            setErrorMessage(error);
        });
}

function AxiosGetReservasPorProducto(idProducto, setReservas, setErrorMessage) {
    axios
        .get(`http://localhost:8080/reservations/get/product/${idProducto}`)
        .then((response) => {
            let reservas = [];
            (response.data).forEach(reserva => {
                let startDateReserva = new Date(reserva.startDate).setHours(0, 0, 0, 0) + 86400000;
                let endDateReserva = new Date(reserva.endDate).setHours(0, 0, 0, 0) + 86400000;
                let i = startDateReserva;
                while (i <= endDateReserva) {
                    reservas.push(new Date(i).toDateString());
                    i += 86400000;
                }
            });
            setReservas(reservas);
            console.log(reservas, "reservas");
        })
        .catch((error) => {
            setErrorMessage("No es posible mostrar la página");
        });
}

function AxiosGetPuntuacionDelProducto(email, idProduct, setStartIndex) {
    axios
        .get(`http://localhost:8080/products/scores/getByUserAndProduct/${email}/${idProduct}`, {
            headers: {
                "Authorization": `Bearer ${sessionStorage.getItem("token")}`
            }
        })
        .then((response) => {
            setStartIndex(response.data.score);
        })
        .catch((error) => {
            console.log(error);
        });
}

function AxiosResetPuntuacion(email, idProduct, setStartIndex) {
    axios
        .put(`http://localhost:8080/products/scores/resetScore/${email}/${idProduct}`, {
            headers: {
                "Authorization": `Bearer ${sessionStorage.getItem("token")}`
            }
        })
        .then((response) => {
            setStartIndex(response.data.score);
        })
        .catch((error) => {
            console.log(error);
        });
}

function AxiosCrearProducto(name, description, latitude, longitude, address, qualification, reference, categoryId, cityId, rules, health, politics, images, features, setErrorProduct) {
    /* axios
        .post("http://localhost:3000/products/create", {
            name,
            description,
            latitude,
            longitude,
            address,
            qualification,
            reference,
            category: {
                id: categoryId
            },
            city: {
                id: cityId
            },
            rules,
            health,
            politics
        }, {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem("token")}`
            }
        })       
        .then(product => {
            setErrorProduct("")
            openModalSucceed()
            let idProduct = product.data.id;
            images.forEach(image => {
                axios
                    .post(`http://localhost:3000/images/create`, {
                        title: image.title,
                        url: image.url,
                        productId: idProduct
                    }, {
                        headers: {
                            Authorization: `Bearer ${sessionStorage.getItem("token")}`
                        }
                    })
                    .catch((error) => {
                        setErrorProduct(`Lamentablemente no se ha podido cargar la imagen ${image.title} . Por favor, intente más tarde`)
                    });
            });
            features.forEach(feature => {
                axios
                    .post(`http://localhost:3000/features/update`, {
                        featureId: feature.id,
                        productId: idProduct
                    }, {
                        headers: {
                            Authorization: `Bearer ${sessionStorage.getItem("token")}`
                        }
                    })
                    .catch((error) => {
                        setErrorProduct(`Lamentablemente no se ha podido cargar el atributo ${feature.name} . Por favor, intente más tarde`)
                    });
            });

        })
        .catch((error) => {
            console.log(error);
            setErrorProduct("Lamentablemente el producto no ha podido crearse. Por favor, intente más tarde")
        }); */

}

function AxiosModificarProducto(name, description, latitude, longitude, address, qualification, reference, categoryId, cityId, rules, health, politics, setErrorProduct) {
//Hay que reformular la parte de modificar las imagenes y features para que elimine las que ya no están, deje las que sí están y las imagenes que no están las cree

    /* axios
        .post("http://localhost:3000/products/update", {
            name,
            description,
            latitude,
            longitude,
            address,
            qualification,
            reference,
            category: {
                id: categoryId
            },
            city: {
                id: cityId
            },
            rules,
            health,
            politics
        }, {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem("token")}`
            }
        })       
        .then(product => {
            setErrorProduct("")
            openModalSucceed()
            let idProduct = product.data.id;
            images.forEach(image => {
                axios
                    .post(`http://localhost:3000/images/create`, {
                        title: image.title,
                        url: image.url,
                        productId: idProduct
                    }, {
                        headers: {
                            Authorization: `Bearer ${sessionStorage.getItem("token")}`
                        }
                    })
                    .catch((error) => {
                        setErrorProduct(`Lamentablemente no se ha podido cargar la imagen ${image.title} . Por favor, intente más tarde`)
                    });
            });
            features.forEach(feature => {
                axios
                    .post(`http://localhost:3000/features/update`, {
                        featureId: feature.id,
                        productId: idProduct
                    }, {
                        headers: {
                            Authorization: `Bearer ${sessionStorage.getItem("token")}`
                        }
                    })
                    .catch((error) => {
                        setErrorProduct(`Lamentablemente no se ha podido cargar el atributo ${feature.name} . Por favor, intente más tarde`)
                    });
            });

        })
        .catch((error) => {
            console.log(error);
            setErrorProduct("Lamentablemente el producto no ha podido crearse. Por favor, intente más tarde")
        }); */

}

export { AxiosGetProductoPorId, AxiosCalificarProducto, AxiosGetReservasPorProducto, AxiosGetPuntuacionDelProducto, AxiosResetPuntuacion, AxiosCrearProducto, AxiosModificarProducto }