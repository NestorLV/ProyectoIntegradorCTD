import axios from "axios";
const baseURL = "http://localhost:8080/"

//YA TESTEADO
function AxiosGetProductById(id, setProd, setLoading, setErrorMessage) {
    axios
        .get(`${baseURL}products/get/${id}`)
        .then((response) => {
            setProd(response.data);
            setLoading(false);
        })
        .catch((error) => {
            sessionStorage.setItem("productoErroneo", "true")
            window.location.href = "/"
            setErrorMessage(error);
        });
}

function AxiosCalificarProducto(starIndex, id, setCalificacion_text, setErrorMessage) {
    axios
        .post(`${baseURL}products/scores/create`, {
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

//YA PROBADO

function AxiosGetReservasPorProducto(idProducto, setReservas, setErrorMessage) {
    axios
        .get(`${baseURL}reservations/get/product/${idProducto}`)
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

//YA PROBADO

function AxiosGetProductScore(email, idProduct, setStartIndex) {
    axios
        .get(`${baseURL}products/scores/getByUserAndProduct/${email}/${idProduct}`, {
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
        .put(`${baseURL}products/scores/resetScore/${email}/${idProduct}`, {
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

//YA PROBADO

function AxiosGetCategories(setLoading, setOptionsCategories, setErrorMessage) {
    axios
        .get(baseURL + "categories/all")
        .then((response) => {
            setLoading(false);
            setOptionsCategories(response.data.map((category) => { return { id: category.id, name: category.title } }));
        })
        .catch((error) => {
            setErrorMessage(error.message);
            setLoading(false);
        });
}

//ya probado

function AxiosGetCities(setLoading, setOptionsCities, setErrorMessage) {
    axios
        .get(baseURL + "cities/all")
        .then((response) => {
            setLoading(false);
            setOptionsCities(response.data.map((city) => { return { id: city.id, name: city.name } }));
        })
        .catch((error) => {
            setErrorMessage(error.message);
            setLoading(false);
        });
}

//YA TESTEADO

function AxiosGetFeatures(setLoading, setOptionsFeatures, setErrorMessage) {
    axios
        .get(baseURL + "features/all")
        .then((response) => {
            setLoading(false);
            setOptionsFeatures(response.data.map((feature) => { return { id: feature.id, name: feature.title } }));
        })
        .catch((error) => {
            setErrorMessage(error.message);
            setLoading(false);
        });
}

function AxiosCrearProducto(name, description, latitude, longitude, address, qualification, reference, categoryId, cityId, rules, health, politics, images, features, setErrorProduct, openModalSucceed) {
    let qualificationInt = parseInt(qualification);
    
    axios
        .post("http://localhost:8080/products/create", {
            name,
            description,
            latitude,
            longitude,
            address,
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
            console.log("primer post con éxito")
            setErrorProduct("")
            /* openModalSucceed() */
            let idProduct = product.data.id;
            console.log(qualificationInt, "qualificationint");
            axios
                .post(`http://localhost:8080/products/scores/create`, {
                    score: qualificationInt,
                    userEmail: sessionStorage.getItem('email'),
                    productId: idProduct
                })
                .then((response) => {
                    if (response.status === 200) {
                        console.log("Se envió correctamente la puntuación");
                    }
                })
                .catch((error) => {
                    setErrorProduct(error);
                });
            images.forEach(image => {               
                axios
                    .post(`http://localhost:8080/images/create`, {
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
                let featureInt = parseInt(feature.id);               
                axios
                    .post(`http://localhost:8080/features/updateproduct/${featureInt}/${idProduct}`, {},
                    {
                        headers: {
                            Authorization: `Bearer ${sessionStorage.getItem("token")}`
                        }
                    })
                    .catch((error) => {
                        setErrorProduct(`Lamentablemente no se ha podido cargar el atributo ${feature.value} . Por favor, intente más tarde`)
                        console.log(error);
                    });
            });           
        })
        .then(()=>{
            openModalSucceed()
        })
        .catch((error) => {           
            setErrorProduct("Lamentablemente el producto no ha podido crearse. Por favor, intente más tarde")
        });

}

function AxiosModificarProducto(name, description, latitude, longitude, address, qualification, reference, categoryId, cityId, rules, health, politics, images, features, setErrorProduct) {
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

export { AxiosGetProductById, AxiosCalificarProducto, AxiosGetReservasPorProducto, AxiosGetProductScore, AxiosResetPuntuacion, AxiosGetCategories, AxiosGetFeatures, AxiosGetCities, AxiosCrearProducto, AxiosModificarProducto };
