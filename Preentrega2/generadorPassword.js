function GeneradorPassword(Contrasenias) {
    // console.log("funciona el boton")
    let nombre = document.getElementById("Nombrepass").value
    let fecha = document.getElementById("Aniopass").value
    let caracterEspecial = document.getElementById("Caracterpass").value
    let nFavorito = document.getElementById("Numeropass").value
    let contadorCiclos = ValidarElementos(nombre, fecha, caracterEspecial, nFavorito, Contrasenias);

    return contadorCiclos;
}

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
    console.log(nombre, fecha, caracter, numero)

    constructorPassword(nombre, fecha, caracter, numero, Contrasenias);
    return Contrasenias.length; // Devuelve la longitud del array después de agregar la contraseña
}

function constructorPassword(nombre, fecha, caracter, numero, Contrasenias){
    password = nombre + fecha + caracter + numero;
    Contrasenias.push(password);

    let DivPassword = document.getElementById("generadorPassword");
    // DivPassword.innerHTML = "Tu contraseña Nro " + contadorCiclos + " es " + password;
    // DivPassword.className = "text-danger";
    
    DivPassword.innerHTML = "Se genero tu contraseña correctamente!";
    DivPassword.className = "text-success";
    generarBotonContraseñas(Contrasenias);


}

function generarBotonContraseñas(Contrasenias) {
    var botonPasswords = document.getElementById("BotonPassword");

    if (!botonPasswords) {
        botonPasswords = document.createElement("button");
        botonPasswords.id = "BotonPassword";
        botonPasswords.className = "btn btn-primary";
        var contenedorBotones = document.getElementById("botones");
        contenedorBotones.appendChild(botonPasswords);

        botonPasswords.addEventListener("click", function () {
            let contenedorPasswords=document.getElementById("contenedorPasswords");
            contenedorPasswords.innerHTML="";
            mostrarPasswords(Contrasenias);
        });
    }

    botonPasswords.innerText = "Mostrar " + Contrasenias.length + " Password";
}




var Contrasenias = [];
document.getElementById("boton").addEventListener("click", function () {
    GeneradorPassword(Contrasenias);
    
});


function mostrarPasswords(Contrasenias){ 
    contadorNroPass= 0;
    contadorAlertas= 1;
    var clasesAlerts = ["primary", "secondary", "success", "danger", "warning", "info", "light", "dark"]
    let contenedorPasswords=document.getElementById("contenedorPasswords");
    let divPasswords= document.getElementById("password");
    for (const password of Contrasenias) {
        contadorNroPass= contadorNroPass+1;
        
        divPasswords=document.createElement("div");
        divPasswords.id="PasswordsGeneradas";
        //divPasswords.className = "alert alert-primary";
        divPasswords.className = "alert alert-" + clasesAlerts[contadorAlertas];
        divPasswords.innerText = "Tu contraseña Nro " + contadorNroPass + " es " + password;
        contenedorPasswords.appendChild(divPasswords);
        
        contadorAlertas= contadorAlertas+1;
        console.log(password)
    }
}