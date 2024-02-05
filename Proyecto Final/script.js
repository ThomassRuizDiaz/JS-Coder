
function generarEnlaceFoto(idFoto) {
    const baseURL = 'https://maps.googleapis.com/maps/api/place/photo';
    const maxWidth = 400; // Ajusta el ancho máximo según tus necesidades
    const apiKey = 'AIzaSyCR7xeF7rVyXQtinb3rlAuST8RjL6pw930'; // Reemplaza con tu clave de API
  
    const enlaceFoto = `${baseURL}?maxwidth=${maxWidth}&photoreference=${idFoto}&key=${apiKey}`;
  
    return enlaceFoto;
}
// Ejemplo de uso
const idFoto = 'AWU5eFhdkj_F7ZDoGL2Vy191RqGJ9Qk0cFF59K8gNaejfZOA5ov34Z80jcKcLcNKTxspdfFAeyXOrZPCxEGk62yVx5iDl-ju-J3Y4bw7lrRLI_U7u2FcxGKEXL3xjdYu_CTQmysM0ro357M88GDzWqeq7LgCOgk2Ht2hdtYC';

const enlaceFoto = generarEnlaceFoto(idFoto);
console.log(enlaceFoto);




