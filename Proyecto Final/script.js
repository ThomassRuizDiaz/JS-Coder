
function generarEnlaceFoto(idFoto) {
    const baseURL = 'https://maps.googleapis.com/maps/api/place/photo';
    const maxWidth = 400;
    const apiKey = 'AIzaSyCR7xeF7rVyXQtinb3rlAuST8RjL6pw930'; 
  
    const enlaceFoto = `${baseURL}?maxwidth=${maxWidth}&photoreference=${idFoto}&key=${apiKey}`;
  
    return enlaceFoto;
}
const idFoto = 'AWU5eFhdkj_F7ZDoGL2Vy191RqGJ9Qk0cFF59K8gNaejfZOA5ov34Z80jcKcLcNKTxspdfFAeyXOrZPCxEGk62yVx5iDl-ju-J3Y4bw7lrRLI_U7u2FcxGKEXL3xjdYu_CTQmysM0ro357M88GDzWqeq7LgCOgk2Ht2hdtYC';

const enlaceFoto = generarEnlaceFoto(idFoto);
console.log(enlaceFoto);



function mostrarValorChechbox(){
    var checkbox = document.getElementById("filterRestaurant");

    // Verificar si el checkbox está seleccionado
    if (checkbox.checked) {
        // Mostrar el valor del checkbox en la consola si está seleccionado
        console.log(checkbox.value);
    } else {
        // Si no está seleccionado, mostrar un mensaje indicando que está deseleccionado
        console.log("El checkbox está deseleccionado");
    }
}

document.getElementById("boton").addEventListener("click", mostrarValorChechbox);




