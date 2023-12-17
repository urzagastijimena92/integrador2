const url = 'https://656d1634bcc5618d3c22d569.mockapi.io/carrito/'



async function enviar(carrito) {
    return await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify(carrito)
    }).then(r => r.json())
}


export default {
    enviar,
}
    