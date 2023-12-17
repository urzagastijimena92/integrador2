import carrito from './carrito.js';
import productosMem from './productosMem.js';
import servicioProductos from './servicioProductos.js';

function render() {
    
    var cards = ''

    let productos = productosMem.getAll()

    if(productos.length) {
        for(var i=0; i<productos.length; i++) {
            cards += 
        
                `<section class="cards">
                    <div id="codigo"><b>Código: </b>${productos[i].codigo}</div>
                    <img src="${productos[i].foto}" alt="">
                    <h3>${productos[i].nombre}</h3>
                    <p>${productos[i].detalles}</p>
                    <br>
                    <p><b>Duración: </b>${productos[i].duracion}</p>
                    <p><b>Categoría: </b>${productos[i].categoria}</p>
                    <p><b>Vacantes: </b>${productos[i].vacantes}</p>
                    <br>
                    <p><b class="precio">Precio: </b>$${productos[i].precio}</p>
                    <p><b style="color:crimson;">6 Cuotas sin interés: </b>${productos[i].cuotas? 'Si' : 'No'}</p>
                    <div class="botones-contenedor">
                       <a href="./index.html#cursos"><button class="btn-info efecto">Más info</button></a> 
                        <button id ="btnAgregar-${productos[i].id}" class="btn-comprar efecto">Agregar al carrito</button></div>

                </section>`
                
        }
    }
    else cards = '<h2 style="color:white;">No se encontraron productos para mostrar</h2>'

    document.querySelector('.cards-container').innerHTML = cards
    
}

    
// -------------------------------------------------------------------------



function setListeners() {
    const botones = document.querySelectorAll('.cards .btn-comprar')
    botones.forEach(boton => {
        boton.addEventListener('click', e => {
            const id = e.target.id.split('-')[1]

            let producto = productosMem.get(id)

            carrito.agregar(producto)
        })
    })    
}



async function start() {

    let productos = await servicioProductos.getAll()
    productosMem.set(productos)

    render()
    setListeners()
}

export default {
    start
}


