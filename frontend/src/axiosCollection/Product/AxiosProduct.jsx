import axios from "axios";
const baseURL = "http://worldguestbooking.com.ar:8080/";

//YA TESTEADO
function AxiosGetProductById(id, setProd, setLoading, setErrorMessage) {
  axios
    .get(`${baseURL}products/get/${id}`)
    .then((response) => {
      setProd(response.data);
      setLoading(false);
    })
    .catch((error) => {
      sessionStorage.setItem("productoErroneo", "true");
      window.location.href = "/";
      setErrorMessage(error);
    });
}

function AxiosCalificarProducto(
  starIndex,
  id,
  setCalificacion_text,
  setErrorMessage
) {
  axios
    .post(`${baseURL}products/scores/create`, {
      score: starIndex,
      userEmail: sessionStorage.getItem("email"),
      productId: id,
    })
    .then((response) => {
      if (response.status === 200) {
        setCalificacion_text(
          `Se envió correctamente la puntuación de: ${starIndex}`
        );
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
      response.data.forEach((reserva) => {
        let startDateReserva =
          new Date(reserva.startDate).setHours(0, 0, 0, 0) + 86400000;
        let endDateReserva =
          new Date(reserva.endDate).setHours(0, 0, 0, 0) + 86400000;
        let i = startDateReserva;
        while (i <= endDateReserva) {
          reservas.push(new Date(i).toDateString());
          i += 86400000;
        }
      });
      setReservas(reservas);
    })
    .catch((error) => {
      setErrorMessage("No es posible mostrar la página");
    });
}

//YA PROBADO

function AxiosGetProductScore(email, idProduct, setStartIndex) {
  axios
    .get(
      `${baseURL}products/scores/getByUserAndProduct/${email}/${idProduct}`,
      {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      }
    )
    .then((response) => {
      if (response.data.score !== undefined) {
        setStartIndex(response.data.score);
      } else {
        setStartIndex(0);
      }
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
      setOptionsCategories(
        response.data.map((category) => {
          return { id: category.id, name: category.title };
        })
      );
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
      setOptionsCities(
        response.data.map((city) => {
          return { id: city.id, name: city.name };
        })
      );
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
      setOptionsFeatures(
        response.data.map((feature) => {
          return { id: feature.id, name: feature.title };
        })
      );
    })
    .catch((error) => {
      setErrorMessage(error.message);
      setLoading(false);
    });
}

function AxiosCrearProducto(
  name,
  description,
  latitude,
  longitude,
  address,
  qualification,
  reference,
  categoryId,
  cityId,
  rules,
  health,
  politics,
  images,
  features,
  setErrorProduct,
  openModalSucceed,
  openModalExpiredLogin,
  openModalExistedProduct
) {
  let qualificationInt = parseInt(qualification);

  axios
    .post(
      "http://worldguestbooking.com.ar:8080/products/create",
      {
        name,
        description,
        latitude,
        longitude,
        address,
        reference,
        category: {
          id: categoryId,
        },
        city: {
          id: cityId,
        },
        rules,
        health,
        politics,
      },
      {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      }
    )
    .then((product) => {
      setErrorProduct("");
      let idProduct = product.data.id;
      axios
        .post(`http://worldguestbooking.com.ar:8080/products/scores/create`, {
          score: qualificationInt,
          userEmail: sessionStorage.getItem("email"),
          productId: idProduct,
        })
        .catch((error) => {
          setErrorProduct(error);
        });
      images.forEach((image) => {
        axios
          .post(
            `http://worldguestbooking.com.ar:8080/images/create`,
            {
              title: image.title,
              url: image.url,
              productId: idProduct,
            },
            {
              headers: {
                Authorization: `Bearer ${sessionStorage.getItem("token")}`,
              },
            }
          )
          .catch((error) => {
            setErrorProduct(
              `Lamentablemente no se ha podido cargar la imagen ${image.title} debido a ${error} . Por favor, intente más tarde`
            );
          });
      });
      let featuresInt = [];
      features.forEach((feature) => {
        featuresInt.push(parseInt(feature.id));
      });
      axios
        .post(
          `http://worldguestbooking.com.ar:8080/features/update/${idProduct}`,
          featuresInt,
          {
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            },
          }
        )
        .catch((error) => {
          setErrorProduct(
            `Lamentablemente no se han podido cargar los atributos debido a ${error}. Por favor, intente más tarde`
          );
        });
    })
    .then(() => {
      openModalSucceed();
    })
    .catch((error) => {
      if (error.response.status === 400) {
        openModalExistedProduct();
      }
      if (error.response.status === 404) {
        openModalExpiredLogin();
      }
      setErrorProduct(
        "Lamentablemente el producto no ha podido crearse. Por favor, intente más tarde"
      );
    });
}

function AxiosModificarProducto(
  idProduct,
  name,
  description,
  latitude,
  longitude,
  address,
  qualification,
  reference,
  categoryId,
  cityId,
  rules,
  health,
  politics,
  images,
  features,
  setErrorProduct,
  openModalSucceed,
  openModalExpiredLogin
) {
  let qualificationInt = parseInt(qualification);
  axios
    .post(
      "http://worldguestbooking.com.ar:8080/products/update",
      {
        id: idProduct,
        name,
        description,
        latitude,
        longitude,
        address,
        reference,
        category: {
          id: categoryId,
        },
        city: {
          id: cityId,
        },
        rules,
        health,
        politics,
      },
      {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      }
    )
    .then((product) => {
      setErrorProduct("");
      let idProduct = product.data.id;
      axios
        .post(`http://worldguestbooking.com.ar:8080/products/scores/create`, {
          score: qualificationInt,
          userEmail: sessionStorage.getItem("email"),
          productId: idProduct,
        })
        .catch((error) => {
          setErrorProduct(error);
        });
      let arrayImages = [];
      images.forEach((image) => {
        let img = {
          id: image.id,
          title: image.title,
          url: image.url,
          productId: idProduct,
        };
        arrayImages.push(img);
      });
      axios
        .post(
          `http://worldguestbooking.com.ar:8080/images/updateimagesperproduct`,
          arrayImages,
          {
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            },
          }
        )
        .catch((error) => {
          setErrorProduct(
            `Lamentablemente no se han podido cargar las imagenes debido a ${error}. Por favor, intente más tarde`
          );
        });
      let featuresInt = [];
      features.forEach((feature) => {
        featuresInt.push(parseInt(feature.id));
      });
      axios
        .post(
          `http://worldguestbooking.com.ar:8080/features/update/${idProduct}`,
          featuresInt,
          {
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            },
          }
        )
        .catch((error) => {
          setErrorProduct(
            `Lamentablemente no se han podido cargar los atributos debido a ${error}. Por favor, intente más tarde`
          );
        });
    })
    .then(() => {
      openModalSucceed();
    })
    .catch((error) => {
      if (error.response.status === 404) {
        openModalExpiredLogin();
      }
      setErrorProduct(
        `Lamentablemente el producto no ha podido crearse debido a ${error}. Por favor, intente más tarde`
      );
    });
}

function AxiosFindScoreByIdUser(idProduct) {
  let email = sessionStorage.getItem("email");
  axios
    .get(
      `http://worldguestbooking.com.ar:8080/products/scores/getByUserAndProduct/${email}/${idProduct}`,
      {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      }
    )
    .then((response) => {
      return response.data.score;
    })
    .catch((error) => {
      console.log(error);
    });
}

export {
  AxiosGetProductById,
  AxiosCalificarProducto,
  AxiosGetReservasPorProducto,
  AxiosGetProductScore,
  AxiosGetCategories,
  AxiosGetFeatures,
  AxiosGetCities,
  AxiosCrearProducto,
  AxiosModificarProducto,
  AxiosFindScoreByIdUser,
};
