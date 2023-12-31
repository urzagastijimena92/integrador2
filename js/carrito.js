import servicioCarrito from './servicioCarrito.js';

let refBotonBorrar
let refBotonPedir
let subtotal

var carrito = []



function guardar() {
    localStorage.setItem('carrito', JSON.stringify(carrito))
}

function leer() {
    try {
        return JSON.parse(localStorage.getItem('carrito'))
    }
    catch {
        return []
    }  
}

function agregar(producto) {
    let pC = carrito.find(prodC => prodC.id == producto.id)

    if(!pC) {
        producto.cantidad = 1
        carrito.push(producto)
    }
    else {
        pC.cantidad++
    }
    guardar()
}

function borrarID(id){
    const index = carrito.findIndex(p => p.id == id)
    carrito.splice(index,1)
    guardar()
}

function incrementarCantID(id) {
    const producto = carrito.find(p => p.id == id)
    if(producto.cantidad < producto.vacantes) {
        producto.cantidad++
        guardar()
    }
}

function decrementarCantID(id) {
    const producto = carrito.find(p => p.id == id)
    if(producto.cantidad > 1) {
        producto.cantidad--
        guardar()
    }
}

function borrar() {
    if(confirm('¿Está seguro que quiere borrar todo el carrito?')){
        carrito = []
        guardar()
        render()
    }
}

async function pedir() {
    await servicioCarrito.enviar({pedido: carrito})

    carrito = []
    guardar()
    render()
}

function render() {

    var filasTabla = `<tr>
                        <th>#</th>
                        <th>nombre del curso</th>
                        <th>precio</th>
                        <th>foto</th>
                        <th>vacantes disponibles</th>
                        <th>vacantes solicitadas</th>
                        <th>acciones</th>
                        <th>subtotal</th>
                    </tr>`

    if(carrito && carrito.length) {
        for(var i=0; i<carrito.length; i++) {
            filasTabla += 
                `<tr> 
                    <td>${carrito[i].id}</td>
                    <td>${carrito[i].nombre} </td>
                    <td> $${carrito[i].precio}</td>
                    <td><img width="100%" src=" ${carrito[i].foto}" alt="foto de ${carrito[i].nombre}"></td>
                    <td>${carrito[i].vacantes}</td>
                    <td>
                        <button id="btnDecrementar-${carrito[i].id}">-</button>
                        &nbsp${subtotal = carrito[i].vacantes >= carrito[i].cantidad ? carrito[i].cantidad : carrito[i].vacantes}&nbsp
                        <button id="btnIncrementar-${carrito[i].id}">+</button>
                    </td>
                    <td>
                        <button id="btnBorrar-${carrito[i].id}">Borrar</button>
                    </td>
                    <td id="total"> $${subtotal * carrito[i].precio}</td>
                </tr>`
        }
        refBotonBorrar.style.display = 'block'
        refBotonPedir.style.display = 'block'
    }
    else {
        filasTabla = '<h2>No se encontraron pedidos para mostrar</h2>'
        refBotonBorrar.style.display = 'none'
        refBotonPedir.style.display = 'none'
    }


    document.querySelector('table').innerHTML = filasTabla
   
    setListeners()

}

    
function setListeners() {
    const botonesEliminar = document.querySelectorAll('.carrito table button[id*="btnBorrar-"]')
    botonesEliminar.forEach(boton => {
        boton.addEventListener('click', async e => {
            const id = e.target.id.split('-')[1]

            if(confirm('¿Está seguro de borrar este curso del carrito?')) {
                borrarID(id)
                render()
            }
        })
    })

    const botonesIncrementar = document.querySelectorAll('.carrito table button[id*="btnIncrementar-"]')
    botonesIncrementar.forEach(boton => {
        boton.addEventListener('click', async e => {
            const id = e.target.id.split('-')[1]
    
            incrementarCantID(id)
            render()
        })
    })

    const botonesDecrementar = document.querySelectorAll('.carrito table button[id*="btnDecrementar-"]')
    botonesDecrementar.forEach(boton => {
        boton.addEventListener('click', async e => {
            const id = e.target.id.split('-')[1]
            decrementarCantID(id)
            render()
        })
    })

    refBotonBorrar.addEventListener('click', borrar)
    refBotonPedir.addEventListener('click', pedir)

}




function start(){

    refBotonBorrar = document.querySelector('.carrito .btn-borrar')
    refBotonPedir = document.querySelector('.carrito .btn-pedir')

    carrito = leer()
    console.log('Valor de carrito al iniciar:', carrito);
    render()
}

export default{
    start, 
    agregar
}

