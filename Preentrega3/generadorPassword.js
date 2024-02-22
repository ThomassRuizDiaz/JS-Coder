//INICIALIZADORES
var Contrasenias = [];
contadorPasswords = 0;
//INICIALIZADORES

//BOTONES
//Boton para arrancar todo el codigo
document.getElementById("boton").addEventListener("click", function () {
    GeneradorPassword(Contrasenias);
});
//BOTONES


//FUNCIONES
//funcion constructora
function Password(nombre, fecha, caracter, numero) {
    this.nombre = nombre;
    this.fecha = fecha;
    this.caracter = caracter;
    this.numero = numero;
}

//funcion principal desde donde arranca todo el codigo, desde aca se toman las variables del dom y va a la funcion validarElementos
function GeneradorPassword(Contrasenias) {
    // console.log("funciona el boton")
    let nombre = document.getElementById("Nombrepass").value
    let fecha = document.getElementById("Aniopass").value
    let caracterEspecial = document.getElementById("Caracterpass").value
    let nFavorito = document.getElementById("Numeropass").value
    ValidarElementos(nombre, fecha, caracterEspecial, nFavorito, Contrasenias);
}

//funcion para validar los elemmentos, luego de validar manda los datos a la funcion constructora que guarda el valor del objeto en la posicion de contadorPasswords, luego de ahi va a la funcion constructorPassword
function ValidarElementos(nombre, fecha, caracter, numero, Contrasenias) {
    let DivNombre = document.getElementById("ValidNombre");
    let DivFecha = document.getElementById("ValidAnio");
    if (nombre.length >= 3) {
        DivNombre.innerHTML = "";
    } else {
        DivNombre.innerHTML = "Introduzca un nombre valido";
        DivNombre.className = "text-danger";
        return false;
    }
    if (/[A-Z]/.test(nombre)) {
        DivNombre.innerHTML = "";
    } else {
        DivNombre.innerHTML = "El nombre debe contener una Mayuscula";
        DivNombre.className = "text-danger";
        return false;
    }
    if (fecha.length == 4) {
        DivFecha.innerHTML = "";
    } else {
        DivFecha.innerHTML = "Introduzca un año valido";
        DivFecha.className = "text-danger";
        return false;
    }
    Contrasenias[contadorPasswords] = new Password(nombre, fecha, caracter, numero);
    console.log(Contrasenias)
    constructorPassword(nombre, fecha, caracter, numero, Contrasenias);
    contadorPasswords = contadorPasswords + 1;
    return contadorPasswords;
}

//funcion desde donde se reemplaza el valor del array que contiene objetos por la contraseña final ya construida, ej: contrasenia[0]= objeto con todos los valores de la contraseña, luego de pasar por la funcion el valor contrasenias[0] = contraseña final. Luego de conformar la contraseña confirma que la contraseña se genero correctamente deja un texto confirmando y ademas guarda el valor de contrasenias en el localstorage y luego va a la funcion generarBotonContraseñas.
function constructorPassword(nombre, fecha, caracter, numero, Contrasenias) {
    for (let i = 0; i < Contrasenias.length; i++) {
        if (Contrasenias[i].nombre) {
            Contrasenias[i] = Contrasenias[i].nombre + Contrasenias[i].fecha + Contrasenias[i].caracter + Contrasenias[i].numero;
            console.log("La contraseña " + i + " es: " + Contrasenias[i]);
        } else {
            continue;
        }
    }
    let DivPassword = document.getElementById("generadorPassword");
    DivPassword.innerHTML = "Se genero tu contraseña correctamente!";
    DivPassword.className = "text-success";
    localStorage.setItem('contrasenias', JSON.stringify(Contrasenias));
    generarBotonContraseñas(Contrasenias);
}

//funcion que busca si existe un boton/elemento llamado "BotonPassword", en caso de que no este creado lo crea y ademas define que si se presiona el mismo boton se limpian todas las contraseñas mostradas y ademas se dirige al boton mostrarPassword.
function generarBotonContraseñas(Contrasenias) {
    var botonPasswords = document.getElementById("BotonPassword");
    if (!botonPasswords) {
        botonPasswords = document.createElement("button");
        botonPasswords.id = "BotonPassword";
        botonPasswords.className = "btn btn-primary";
        var contenedorBotones = document.getElementById("botones");
        contenedorBotones.appendChild(botonPasswords);
        botonPasswords.addEventListener("click", function () {
            let contenedorPasswords = document.getElementById("contenedorPasswords");
            contenedorPasswords.innerHTML = "";
            mostrarPasswords(Contrasenias);
        });
    }
    botonPasswords.innerText = "Mostrar " + Contrasenias.length + " Password";
}

//funcion que muestra las contraseñas guardadas en el array de contrasenias, ademas define una array con colores para adjuntar a la clase del div contenedor de la contraseña mostrada.
function mostrarPasswords(Contrasenias) {
    console.log("contraseña " + Contrasenias);
    contadorNroPass = 0;
    contadorAlertas = 1;
    var clasesAlerts = ["primary", "secondary", "success", "danger", "warning", "info", "light", "dark"]
    let contenedorPasswords = document.getElementById("contenedorPasswords");
    for (const password of Contrasenias) {
        contadorNroPass = contadorNroPass + 1;

        let divPasswords = document.createElement("div");
        divPasswords.className = "alert alert-" + clasesAlerts[contadorAlertas];
        divPasswords.innerText = "Tu contraseña Nro " + contadorNroPass + " es " + password;
        contenedorPasswords.appendChild(divPasswords);

        contadorAlertas = contadorAlertas + 1;
        console.log(password)
    }
}
//FUNCIONES

//IFS
//este if basicamente revisa si "contrasenias" esta guardado en localstorage, en ese caso agarra el valor del localstorage, y en caso que haya agarrado valor va a la funcion generarBotonContraseñas para poder mostrar que existen contraseñas guardadas
if (localStorage.getItem('contrasenias')) {
    Contrasenias = JSON.parse(localStorage.getItem('contrasenias'));
    if (Contrasenias.length > 0) {
        var botonEliminarPasswords = document.getElementById("BotonEliminarPassword");
        console.log("hay passwords")
        if (!botonEliminarPasswords) {
            botonEliminarPasswords = document.createElement("button");
            botonEliminarPasswords.id = "BotonEliminarPassword"; 
            botonEliminarPasswords.className = "btn btn-primary";
            botonEliminarPasswords.innerText = "Eliminar " + Contrasenias.length + " Password";
            var contenedorBotones = document.getElementById("botones");
            contenedorBotones.appendChild(botonEliminarPasswords);
        }
        botonEliminarPasswords.addEventListener("click", function () {
            localStorage.removeItem('contrasenias');
            Contrasenias = [];
            console.log("contraseñas borradas: " + Contrasenias);
            window.location.reload();
        });
        generarBotonContraseñas(Contrasenias); 
    }
}
//IFS



