
if (localStorage.getItem("latitud") === null && localStorage.getItem("longitud") === null) {
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(function (position) {
            var latitud = position.coords.latitude;
            var longitud = position.coords.longitude;
            console.log("Latitud: " + latitud + ", Longitud: " + longitud);
            localStorage.setItem("latitud", latitud);
            localStorage.setItem("longitud", longitud);
        });
    }
    Swal.fire({
        title: "Utiliza la ubicacion",
        text: "Si activas la ubicacion la experiencia sera mucho mas precisa!",
        icon: "warning"
    });
}


iniciarBusqueda();
//Por alguna razon cada vez que presionaba el boton de busqueda hacia un llamado a query como si hubiera algo o como si tuviera el parametro "submit", por lo que estuve investignado si yo quito el boton de la etiqueta form se soluciona, el problema es que el boton lo saque de un template y si lo saco del form se rompe el boton. Desde aca empieza el ciclo principal del codigo.
function iniciarBusqueda() {
    var searchButton = document.getElementById('searchButton');
    searchButton.addEventListener('click', function (event) {
        event.preventDefault();
        var ValoraBuscar = document.getElementById('busqueda').value;
        console.log(ValoraBuscar);

        let RangoUbicacion = "";
        let Ubicacion = "";

        if (localStorage.getItem("latitud")) {
            ObtenerRango().then(function (range) {
                console.log("El rango es: " + range);
                RangoUbicacion = range;
                SegundaParteBusqueda(ValoraBuscar,RangoUbicacion,Ubicacion);
            }).catch(function (error) {
                console.error('Error al obtener el rango:', error);
            });
        }else{
            ObtenerUbicacionAproimada().then(function (text) {
                console.log("La ubicacion aproximada es: " + text);
                Ubicacion = text;
                SegundaParteBusqueda(ValoraBuscar,RangoUbicacion,Ubicacion);
            }).catch(function (error) {
                console.error('Error al obtener la ubicacion aproximada:', error);
            });
        };
    });
}

function SegundaParteBusqueda(ValoraBuscar,RangoUbicacion,Ubicacion) {
    let Categoria;
    ObtenerCategoriaBusqueda().then(function(categoria) {
        console.log("La categoria de busqueda es:", categoria);
        Categoria = categoria;
        if (Categoria === undefined) {
            Categoria = "VACIO";
            console.log("categoria es: " + Categoria);
        }
        TerceraParteBusqueda(ValoraBuscar,RangoUbicacion,Ubicacion,Categoria);
    }).catch(function(error) {
        console.error('Error al obtener la categoria de busqueda:', error);
    });
}
function TerceraParteBusqueda(ValoraBuscar,RangoUbicacion,Ubicacion,Categoria){
    let RangoPrecio;
    ObtenerRangoPrecios().then(function(precio) {
        console.log("El rango de precio es:", precio);
        RangoPrecio = precio;
        verificarValores(ValoraBuscar,RangoUbicacion, Ubicacion, Categoria, RangoPrecio);
    }).catch(function(error) {
        console.error('Error al obtener el rango de precios', error);
    });
}

function verificarValores(ValoraBuscar,RangoUbicacion, Ubicacion, RangoPrecio, Categoria) {
    if (((RangoUbicacion || Ubicacion) && RangoPrecio) || (Categoria === "VACIO" && (RangoUbicacion || Ubicacion) && RangoPrecio)) {
        console.log("Todos los valores necesarios estan disponibles o Categoria esta vacio.");
        GoogleMapsAPI(ValoraBuscar, RangoUbicacion, RangoPrecio, Categoria, Ubicacion);

    } else {
        console.error("Hubo un error: alguna variable es undefined o null.");
    }

}

async function ObtenerRango() {
    const { value: range } = await Swal.fire({
        title: "¿En qué radio le gustaría encontrar resultados?",
        icon: "question",
        input: "range",
        inputLabel: "Metros",
        inputAttributes: {
            min: "50",
            max: "10000",
            step: "10"
        },
        inputValue: 500,
        customClass: {
            inputLabel: 'custom-input-class',
            input: 'custom-input-class'
        }
    });
    return range;
}

async function ObtenerUbicacionAproimada() {
    const { value: text } = await Swal.fire({
        input: "textarea",
        inputLabel: "¿Donde te encuentras o donde quieres buscar?",
        inputPlaceholder: "Escribe la Localidad o Provincia donde desees buscar",
        inputAttributes: {
          "aria-label": "Type your message here"
        },
        customClass: {
            inputLabel: 'custom-input-class',
            input: 'custom-input-class'
        }
      });

    return text;
}

async function ObtenerCategoriaBusqueda() {
    const { value: categoria } = await Swal.fire({
        title: "En caso de no saber que quieres buscar en tu rango aqui tienes un listado de posibles puntos de interes",
        input: "select",
        inputOptions: {
            Automovil: {
                gas_station: "Estación de Servicio",
                parking: "Estacionamiento",
                car_repair: "Mecánico"
            },
            Cultura: {
                art_gallery: "Galería de Arte",
                museum: "Museo"
            },
            Entretenimiento: {
                casino: "Casino",
                bowling_alley: "Bowling",
                night_club: "Boliche",
                park: "Parque",
                zoo: "Zoológico",
                shopping_mall: "Shopping"
            },
            Finanzas: {
                bank: "Banco"
            },
            "Comidas y bebidas": {
                restaurant: "Restaurante",
                bar: "Bar",
                coffee_shop: "Café / Merienda",
                ice_cream_shop: "Heladería",
                pizza_restaurant: "Pizzería",
                hamburger_restaurant: "Hamburguesería",
                fast_food_restaurant: "Comida Rápida"
            },
            Salud: {
                pharmacy: "Farmacia",
                hospital: "Hospital"
            },
            Alojamiento: {
                hotel: "Hotel"
            },
            Deportes: {
                gym: "Gimnasio"
            }
        },
        showCancelButton: true,
        customClass: {
            inputLabel: 'custom-input-class',
            input: 'custom-input-class'
        }
      });

    return categoria;
}

async function ObtenerRangoPrecios() {
    const { value: precio } = await Swal.fire({
        title: "Selecciona rango de precio",
        input: "radio",
        inputOptions:{
            PRICE_LEVEL_FREE:"Gratuito",
            PRICE_LEVEL_INEXPENSIVE: "Barato",
            PRICE_LEVEL_MODERATE: "Moderado",
            PRICE_LEVEL_EXPENSIVE: "Caro"
        },
        customClass: {
            inputLabel: 'custom-input-class',
            input: 'custom-input-class'
        }
    });
    return precio;
}


