const url = 'https://656d1634bcc5618d3c22d569.mockapi.io/productos/'

async function getAll(){
    return await fetch(url).then(r => r.json())
}

async function get(id){
    return await fetch(url+id).then(r => r.json())
}


async function guardar(producto) {
    return await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify(producto)
    }).then(r => r.json())
}


async function actualizar(id, producto) {
    return await fetch(url+id, {
        method: 'PUT',
        headers: {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify(producto)
    }).then(r => r.json())
}


async function eliminar(id) {
    return await fetch(url+id, {
        method: 'DELETE'
    }).then(r => r.json())
}

export default {
    getAll,
    get,
    guardar,
    actualizar,
    eliminar
}