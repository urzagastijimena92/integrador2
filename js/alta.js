import productosMem from './productosMem.js';
import servicioProductos from './servicioProductos.js';

let editarID = null

let refCodigo 
let refNombre 
let refPrecio 
let refVacantes
let refDuracion
let refCategoria
let refDetalles
let refFoto
let refCuotas
let refBtnAgregarActualizar


async function agregarActualizar(e) {
    e.preventDefault()

    let codigo = refCodigo.value
    let nombre = refNombre.value
    let precio = refPrecio.value
    let vacantes = refVacantes.value
    let duracion = refDuracion.value
    let categoria = refCategoria.value
    let detalles = refDetalles.value
    let foto = refFoto.value
    let cuotas = refCuotas.checked

    let producto = {
        codigo : codigo,
        nombre : nombre,
        precio : precio,
        vacantes : vacantes,
        duracion : duracion,
        categoria : categoria,
        detalles : detalles,
        foto : foto,
        cuotas : cuotas

    }

    if(editarID) {
        producto.id = editarID
        const productoActualizado = await servicioProductos.actualizar(editarID,producto)
        productosMem.actualizar(productoActualizado.id, producto)

        editarID = null
        ponerBotonAgregar() 
    }
    else {

        let productoGuardado = await servicioProductos.guardar(producto)
        productosMem.guardar(productoGuardado)
    }
    render()

    borrarForm()
}

function borrarForm() {
    refCodigo.value = ''
    refNombre.value = ''
    refPrecio.value = ''
    refVacantes.value = ''
    refDuracion.value = ''
    refCategoria.value = ''
    refDetalles.value = ''
    refFoto.value = ''
    refCuotas.checked = false
}

function copiarProductoEnForm(producto) {

    for(let campo in producto) {
        const ref = document.getElementById(campo)
        if(ref) ref[ref.id == 'cuotas' ? 'checked' : 'value'] = producto[campo]
        
    }
}

function ponerBotonAgregar() {
    refBtnAgregarActualizar.classList.remove('btn-actualizar')
    refBtnAgregarActualizar.classList.add('btn-agregar')
    refBtnAgregarActualizar.innerText= 'Agregar Curso'
}

function ponerBotonActualizar() {
    refBtnAgregarActualizar.classList.remove('btn-agregar')
    refBtnAgregarActualizar.classList.add('btn-actualizar')
    refBtnAgregarActualizar.innerText= 'Actualizar Curso'
}

// ------------------------------------------------------------------
function render() {
    
    let productos = productosMem.getAll()

    var filasTabla = `<tr>
                        <th>#</th>
                        <th>código</th>
                        <th>nombre</th>
                        <th>precio</th>
                        <th>vacantes</th>
                        <th>duración</th>
                        <th>categoría</th>
                        <th>detalles</th>
                        <th>foto</th>
                        <th> 6 Cuotas sin interés</th>
                        <th>acciones</th>
                    </tr>`

    if(productos.length) {
        for(var i=0; i<productos.length; i++) {
            filasTabla += 
                `<tr>
                    <td>${productos[i].id} </td>
                    <td style="background:#FBD63D;"><b>${productos[i].codigo}</b></td>
                    <td>${productos[i].nombre} </td>
                    <td> $${productos[i].precio}</td>
                    <td> ${productos[i].vacantes}</td>
                    <td> ${productos[i].duracion}</td>
                    <td> ${productos[i].categoria}</td>
                    <td> ${productos[i].detalles}</td>
                    <td><img width="100%" src=" ${productos[i].foto}" alt="foto de ${productos[i].nombre}"></td>
                    <td>${productos[i].cuotas? 'Si':'No'}</td>
                    <td>
                        <button ${editarID? 'disabled' : ''} id="btnBorrar-${productos[i].id}">Borrar</button>
                        ${ editarID && editarID == productos[i].id
                            ? `<button id="btnCancelar-${productos[i].id}">Cancelar</button>` 
                            : `<button id="btnEditar-${productos[i].id}">Editar</button>`
                        }
                        </td>

                </tr>`
        }
    }
    else filasTabla = '<h2>No se encontraron productos para mostrar</h2>'

    document.querySelector('table').innerHTML = filasTabla
    setListeners()
}

function setListeners() {
    const botonesEliminar = document.querySelectorAll('.alta button[id*="btnBorrar-"]')
    botonesEliminar.forEach(boton => {
        boton.addEventListener('click', async e => {
            const id = e.target.id.split('-')[1]

            if(confirm('¿Está seguro de borrar este curso?')) {
                const productoEliminado = await servicioProductos.eliminar(id)
                productosMem.eliminar(productoEliminado.id)
     
                if(editarID) {
                     editarID = null
                     ponerBotonAgregar()
                     borrarForm()
                }
               
                render()
            }
        })
    })

    const botonesEditar = document.querySelectorAll('.alta button[id*="btnEditar-"]')
    botonesEditar.forEach(boton => {
        boton.addEventListener('click', e => {
            const id = e.target.id.split('-')[1]
            
            editarID = id
            ponerBotonActualizar()

            let producto = productosMem.get(id)
            copiarProductoEnForm(producto)

            render()
            
        })
    })
    const botonesCancelar = document.querySelectorAll('.alta button[id*="btnCancelar-"]')
    botonesCancelar.forEach(boton => {
        boton.addEventListener('click', e => {
            const id = e.target.id.split('-')[1]
            
            editarID = null

            ponerBotonAgregar()
            borrarForm()
            render()         
        })
    })
}

// ------------------------------------------------------------------


async function start() { 

    refCodigo = document.getElementById('codigo')
    refNombre = document.getElementById('nombre')
    refPrecio = document.getElementById('precio')
    refVacantes = document.getElementById('vacantes')
    refDuracion = document.getElementById('duracion')
    refCategoria = document.getElementById('categoria')
    refDetalles = document.getElementById('detalles')
    refFoto = document.getElementById('foto')
    refCuotas = document.getElementById('cuotas')
    refBtnAgregarActualizar = document.querySelector('.alta .alta-form button')

    
    const formAlta = document.querySelector('.alta-form')
    formAlta.addEventListener('submit', agregarActualizar)
    
    let productos = await servicioProductos.getAll()
    productosMem.set(productos)

    render()
}


export default {
    start
}

