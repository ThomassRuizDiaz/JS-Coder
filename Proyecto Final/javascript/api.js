function Lugar(nombre, fotos, direccion, rating, horarios, mapsurl, precio) {
    this.nombre = nombre;
    this.fotos = fotos;
    this.direccion = direccion;
    this.rating = rating;
    this.horarios = horarios;
    this.mapsurl = mapsurl;
    this.precio = precio;
}



async function GoogleMapsAPI(ValoraBuscar, RangoUbicacion, Categoria, RangoPrecio, Ubicacion) {
    var latitud = localStorage.getItem("latitud");
    var longitud = localStorage.getItem("longitud");

    console.log("La latitud es: " + latitud + ", La longitud es: " + longitud);
    console.log("El text query es: " + ValoraBuscar);
    console.log("El Rango de ubicacion es: " + RangoUbicacion);
    console.log("La categoria es: " + Categoria);
    console.log("El rango de precio es: " + RangoPrecio);
    console.log("La ubicacion es: " + Ubicacion);

    const headers = {
        "Authorization": "Bearer ya29.a0Ad52N3885uj_SUDoYqzgsKL0dcu2Aa8Mvw0HAGN6YcvBejEX0Xi76w7G-PNOxOXl7SZKAVcVNHiGrGdEfrvFspbLj_s5HwUJi9SQowFhITI9SenxXUFiEh0YJaHpvLec4jDtq6lFpK0_dVuzPOAvC-S-qPW-5VQEY5aJaCgYKARQSARMSFQHGX2MiwQf0WhxTehO1XYPnMh5hSA0171",
        "X-Goog-User-Project": "places-412221"
    };


    const baseURL = "https://places.googleapis.com/v1/places:searchText?key=AIzaSyCR7xeF7rVyXQtinb3rlAuST8RjL6pw930&regionCode=AR&fields=places.displayName,places.location,places.types,places.formattedAddress,places.googleMapsUri,places.rating,places.nationalPhoneNumber,places.priceLevel,places.currentOpeningHours,places.photos&languageCode=es";


    let URLFinal;
    let body = {};
    if (ValoraBuscar) {
        if (latitud) {
            URLFinal = `${baseURL}&textQuery=${ValoraBuscar}&priceLevels=${RangoPrecio}`;
            body = {
                "locationBias": {
                    "circle": {
                        "center": {
                            "latitude": `${latitud}`,
                            "longitude": `${longitud}`
                        },
                        "radius": `${RangoUbicacion}`
                    }
                }
            };
        } else {
            URLFinal = `${baseURL}&textQuery=${ValoraBuscar} ${Ubicacion}&priceLevels=${RangoPrecio}`; //El espacio no es un error, simplemente lo que hace es que si por ejemplo la Variable "ValoraBuscar es Farmacia" y "Ubicacion es San Isidro" buscaria en el textQuery "Farmacia San Isidro" y no "FarmaciaSan Isidro"
        }
    } else {
        if (latitud) {
            URLFinal = `${baseURL}&includedType=${Categoria}&textQuery=${Categoria}&priceLevels=${RangoPrecio}`;
            body = {
                "locationBias": {
                    "circle": {
                        "center": {
                            "latitude": `${latitud}`,
                            "longitude": `${longitud}`
                        },
                        "radius": `${RangoUbicacion}`
                    }
                }
            };
        } else {
            URLFinal = `${baseURL}&includedType=${Categoria}&textQuery=${Categoria} ${Ubicacion}&priceLevels=${RangoPrecio}`;
        }
    }
    
    fetch(URLFinal, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(body)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Error de API');
        }
        return response.json();
    })
    .then(data => {
        console.log(data);
        GenerarObjetos(data);
    })
    .catch(error => {
        console.error(error);
    });

}


function GenerarObjetos(data) {
    let Lugares = [];
    if (data && data.places && Array.isArray(data.places)) {
        data.places.forEach(objeto => {
            const nombre = objeto.displayName.text;
            const fotos = objeto.photos;
            const direccion = objeto.formattedAddress;
            const rating = objeto.rating;
            const horarios = objeto.currentOpeningHours.weekdayDescriptions 
            const mapsurl = objeto.googleMapsUri;
            const precio = objeto.priceLevel;

            Lugares.push(new Lugar(nombre, fotos, direccion, rating, horarios, mapsurl, precio));
            
        });
    } else {
        console.error("Error con el objeto DATA");
    }
    console.log("Array final de lugares:");
    Lugares.forEach(lugar => {
        console.log(lugar);
    });

    localStorage.setItem("Lugares", JSON.stringify(Lugares));
    window.location.href = '../Proyecto Final/resultados/resultados.html';
}