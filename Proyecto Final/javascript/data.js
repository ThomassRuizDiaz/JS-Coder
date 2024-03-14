function mostrarResultados(Lugares){
    const contenedorPrincipal = document.querySelector('.contenedor-principal');

    Lugares.forEach(lugar => {
        const lugarInfo = document.createElement('div');
        lugarInfo.className = 'lugar-info';

        const nombreElement = document.createElement('h2');
        nombreElement.className = 'nombre';
        nombreElement.innerText = lugar.nombre;

        const fotosContainer = document.createElement('div');
        fotosContainer.id = 'carouselExampleIndicators_' + Lugares.indexOf(lugar);
        fotosContainer.className = 'carousel slide';
        fotosContainer.setAttribute('data-ride', 'carousel');

        const carouselInner = document.createElement('div');
        carouselInner.className = 'carousel-inner fotos';

        lugar.fotos.forEach((foto, index) => {
            const img = document.createElement('img');
            const photoUrl = generarEnlaceFoto(foto.name);
            img.src = photoUrl;
            img.className = 'd-block w-100 imagen-carousel';
            img.style.height = '400px';
            img.alt = 'Slide ' + (index + 1);
            img.style.objectFit = 'cover';
            const carouselItem = document.createElement('div');
            carouselItem.className = index === 0 ? 'carousel-item active' : 'carousel-item'; 
            carouselItem.appendChild(img);
            carouselInner.appendChild(carouselItem);
        });
        fotosContainer.appendChild(carouselInner);

        const direccionElement = document.createElement('p');
        direccionElement.className = 'direccion';
        direccionElement.innerText = 'Direccion: ' + lugar.direccion;

        const horariosElement = document.createElement('p');
        horariosElement.className = 'horarios';
        horariosElement.innerText = 'Horarios: ' + lugar.horarios.join(', ');

        const mapsurlElement = document.createElement('a');
        mapsurlElement.className = 'mapsurl';
        mapsurlElement.innerText = 'Ver en Google Maps';
        mapsurlElement.href = lugar.mapsurl;
        mapsurlElement.target = '_blank';

        const precioElement = document.createElement('p');
        precioElement.className = 'precio';
        precioElement.innerText = 'Precio: ' + lugar.precio;

        lugarInfo.appendChild(nombreElement);
        lugarInfo.appendChild(fotosContainer);
        lugarInfo.appendChild(direccionElement);
        lugarInfo.appendChild(horariosElement);
        lugarInfo.appendChild(mapsurlElement);
        lugarInfo.appendChild(precioElement);

        contenedorPrincipal.appendChild(lugarInfo);
    });
}


function generarEnlaceFoto(idFoto) {
    idFotoModificado= idFoto.substring(idFoto.indexOf('photos/') + 7);
    const baseURL = 'https://maps.googleapis.com/maps/api/place/photo';
    const maxWidth = 4500;
    const apiKey = 'AIzaSyCR7xeF7rVyXQtinb3rlAuST8RjL6pw930'; 
  
    const enlaceFoto = `${baseURL}?maxwidth=${maxWidth}&photoreference=${idFotoModificado}&key=${apiKey}`;
  
    return enlaceFoto;
}

var Lugares = JSON.parse(localStorage.getItem("Lugares"));

if (Lugares){
    mostrarResultados(Lugares);
}