function GeneradorPassword () {
    alert("Bienvenido al generador de contraseña");
    alert("Vamos a establecer tu nueva contraseña");
    alert("Expertos aseguran que una longitud entre 12 a 18 caracteres es lo ideal!");


    let NuevaContraseña = true
    let contadorCiclos = 0
    while (NuevaContraseña == true) {

        let nombre
        if (contadorCiclos === 0) {
            nombre = prompt("Ingresa tu nombre (la primera letra debe estar en mayúscula)");
        } else {
            nombre = prompt("Ingresa tu nombre de nuevo o introduce otro (la primera letra debe estar en mayúscula)");
        }

        let fecha= prompt("Ingresa tu año de nacimiento")
        let caracterEspecial= prompt("Ingresa un caracter especial (, | . | $ | ; por ejemplo)")
        let nFavorito = prompt("Ingresa tu numero favorito")



        passwordNueva=fecha+nombre+caracterEspecial+nFavorito

        console.log(passwordNueva)

        alert("Tu nueva contraseña es "+passwordNueva)

        let respuesta = prompt("¿Quieres generar otra contraseña? (Si/No)").toLowerCase();
        if (respuesta !== 'si') {
            NuevaContraseña = false;
        }

        contadorCiclos= contadorCiclos + 1
    }


    alert("Gracias por utilizar el generador de contraseñas!")

}


GeneradorPassword();