const botonSearch = document.getElementById('boton-buscar');
const contentForm = document.getElementById('content-form');
const contentArea = document.getElementById('content-area');
const sendForm = document.getElementById('send-form');

const myLibrary = [];

function agregarTagItem(autor, titulo, paginas, leido, img) {
    // Crear el div con la clase "tag-item"
    const nuevoTagItem = document.createElement("div");
    nuevoTagItem.classList.add("tag-item");

    // Crear el div con la clase "tag-img" y el elemento img
    const nuevoTagImg = document.createElement("div");
    nuevoTagImg.classList.add("tag-img");
    const imagen = document.createElement("img");
    imagen.id = "link-img";
    if (img) {
        imagen.src = img;
        } else {
            imagen.src = './imgenSindefinir.png';
        }
    nuevoTagImg.appendChild(imagen);

    // Crear el div con la clase "tag-paragraph" y los elementos de texto
    const nuevoTagParagraph = document.createElement("div");
    nuevoTagParagraph.classList.add("tag-paragraph");
    const parrafo1 = document.createElement("p");
    parrafo1.innerHTML = `Titulo: ${titulo}`;
    const parrafo2 = document.createElement("p");
    parrafo2.innerHTML = `Autor: ${autor}`;
    const parrafo3 = document.createElement("p");
    parrafo3.innerHTML = `Páginas: ${paginas}`;
    nuevoTagParagraph.appendChild(parrafo1);
    nuevoTagParagraph.appendChild(parrafo2);
    nuevoTagParagraph.appendChild(parrafo3);

    // Crear el div con la clase "tag-boton" y los botones
    const nuevoTagBoton = document.createElement("div");
    nuevoTagBoton.classList.add("tag-boton");
    const botonLeido = document.createElement("button");
    botonLeido.name = titulo;
    if (leido) {
        botonLeido.classList.add("leido");
        botonLeido.addEventListener('click', noLeidoFun);
        botonLeido.innerHTML = "Leido";
    } else {
        botonLeido.classList.add("noleido");
        botonLeido.addEventListener('click', leidoFun);
        botonLeido.innerHTML = "No leido";
    }
    const botonBorrar = document.createElement("button");
    botonBorrar.name = titulo;
    botonBorrar.classList.add("borrar");
    botonBorrar.innerHTML = "Borrar";
    botonBorrar.addEventListener("click", function() {
        const tagsContainer = document.querySelector('.tags-container');
        const tagItems = tagsContainer.querySelectorAll('.tag-item');
        const parentContainer = this.closest('.tag-item');
        let indexRemove = NaN;
        tagItems.forEach((item, index) => {
            if (item.innerHTML == parentContainer.innerHTML) {
                indexRemove = index;
                }
                /* refrescarLibreria(); */
                });
        parentContainer.remove();
        myLibrary.splice(indexRemove, 1);
    })
    nuevoTagBoton.appendChild(botonLeido);
    nuevoTagBoton.appendChild(botonBorrar);

    // Agregar los divs creados al div "tag-item"
    nuevoTagItem.appendChild(nuevoTagImg);
    nuevoTagItem.appendChild(nuevoTagParagraph);
    nuevoTagItem.appendChild(nuevoTagBoton);

    // Seleccionar el div padre con la clase "tags-container" y agregar el nuevo div como hijo
    const contenedorTags = document.querySelector(".tags-container");
    contenedorTags.appendChild(nuevoTagItem);
};
function noLeidoFun() {
    this.innerHTML = "No leido";
    this.classList.remove('leido');
    this.classList.add("noleido");
    this.removeEventListener('click', noLeidoFun);
    this.addEventListener('click', leidoFun);
    cambiarLeidoData(myLibrary, this['name']);
}
function leidoFun() {
    this.innerHTML = "Leido";
    this.classList.remove('noleido');
    this.classList.add("leido");
    this.removeEventListener('click', leidoFun);
    this.addEventListener('click', noLeidoFun);
    cambiarLeidoData(myLibrary, this['name']);
}

function cambiarLeidoData(libros, estelibro) {
    for (let i = 0; i < libros.length; i++) {
        if (libros[i].nombre === estelibro) {
        libros[i].leido = !libros[i].leido;
        break;
    }
    
    }
}




class Book {
    constructor(autor, nombre, numero_paginas, leido, url_portada) {
        this.autor = autor;
        this.nombre = nombre;
        this.numero_paginas = numero_paginas;
        this.leido = leido;
        this.url_portada = url_portada;
    }

    isRead() {
        if (this.leido) {
            this.leido = false;
        } else {
            this.leido = true;
        };
    }
}

//cargar libreria al abrir la app
window.addEventListener('load', (event) => {
        const libro1 = new Book('David Rosales', 'El Camino de Plunky para ser Programador', 233, true, 'https://i.postimg.cc/cHjhX3fY/yo.jpg');
        const libro2 = new Book('J.K. Rowling', 'Harry Potter y la piedra filosofal', 223, true, 'https://static.wikia.nocookie.net/esharrypotter/images/9/9a/Harry_Potter_y_la_Piedra_Filosofal_Portada_Espa%C3%B1ol.PNG/');
        const libro3 = new Book('J.K. Rowling', 'Harry Potter y la cámara secreta', 251, true, 'https://static.wikia.nocookie.net/esharrypotter/images/b/b6/Harry_Potter_y_la_Camara_Secreta_Portada_Espa%C3%B1ol.PNG/');
        const libro4 = new Book('Miguel de Cervantes', 'Don Quijote de la Mancha', 863, false, 'https://www.capsulasliterarias.com/wp-content/uploads/2023/05/El-Ingenioso-Hidalgo-Don-Quijote-de-la-Mancha.png');
        let insertarLibros = [libro4, libro3, libro2, libro1];
        insertarLibros.map((libro) => myLibrary.unshift(libro));
        refrescarLibreria();
});


//fin cargar libreria al abrir la app
function obtenerValor() {
    var checkbox = document.getElementById('esLeido');
    var valorCheckbox = checkbox.checked;
    return valorCheckbox;
}

function addBookToLibrary(event) {
    eliminarContenidoDelDiv();
    const formulario = document.getElementById('miFormulario');
    const titulo = formulario.elements['title'].value;
    const autor = formulario.elements['autor'].value;
    const paginasString = formulario.elements['paginas'].value;
    const paginas = Number(paginasString);
    const portada = formulario.elements['portada'].value;
    const leido = obtenerValor();
    const libro = new Book(autor, titulo, paginas, leido, portada);
    myLibrary.unshift(libro);
    refrescarLibreria();
    botonAgregar();
    event.preventDefault();
}

function eliminarContenidoDelDiv() {
    let divPadre = document.querySelector('.tags-container');
    divPadre.innerHTML = '';
    
}

function refrescarLibreria() {
    for (let i = 0; i < myLibrary.length; i++) {
        agregarTagItem( myLibrary[i]['autor'], myLibrary[i]['nombre'], myLibrary[i]['numero_paginas'], myLibrary[i]['leido'], myLibrary[i]['url_portada']);
    }

}

sendForm.addEventListener('click', addBookToLibrary);

function botonAgregar() {
    contentForm.style.transition = 'all 600ms';
    contentArea.style.transition = 'all 600ms';
    botonSearch.style.transition = 'all 600ms';
    contentForm.classList.toggle('display-form');
    botonSearch.classList.toggle('boton-buscar-cerrar');
    contentArea.classList.toggle('blur-section');
    const formulario = document.getElementById('miFormulario');
    formulario.reset();
}

botonSearch.addEventListener('click', botonAgregar);