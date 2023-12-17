
var productos = [
    // { codigo: 155, nombre: 'Maquetado con HTML5 y CSS3', precio: 24000, vacantes: 35, categoria: 'Maquetación', duracion:'9 semanas' , detalles: 'Aprende a crear sitios web visualmente atractivos y responsivos utilizando HTML y CSS.', cuotas: false, foto:'../img/Curso-html-css.jpg', info:'../cursos-mas-info/html.html', id: 'html'},
    // { codigo: 233, nombre: 'JavaScript Inicial', precio: 18000, vacantes: 42, categoria: 'Programación',duracion:'6 semanas' , detalles: 'Comienza tu viaje en la programación web aprendiendo los conceptos básicos de JavaScript.', cuotas: false, foto: '../img/Curso-js-inicial.jpg', info:'../cursos-mas-info/javascriptinicial.html', id:'javainicial'},
    // { codigo: 256, nombre: 'JavaScript Avanzado', precio: 38000, vacantes: 45, categoria: 'Programación',duracion:'15 semanas' , detalles: ' Profundiza en JavaScript con temas avanzados como programación orientada a objetos y manipulación del DOM.', cuotas: true, foto: '../img/Curso-js-avanzado.jpg', info:'../cursos-mas-info/javascriptavanzado.html', id: 'javaavanzado'},
    // { codigo: 245, nombre: 'React JS', precio: 36000, vacantes: 23, categoria: 'Programación',duracion:'14 semanas' , detalles: 'Crea interfaces de usuario modernas y dinámicas con la biblioteca React.js.', cuotas: true, foto: '../img/Curso-react-js.jpg', info:'../cursos-mas-info/react.html', id: 'react'},
    // { codigo: 378, nombre: 'Base de Datos SQL', precio: 15000, vacantes: 36, categoria: 'Base de datos',duracion:'10 semanas' , detalles: 'Aprende a diseñar y gestionar bases de datos relacionales utilizando SQL.', cuotas: false, foto: '../img/Curso-SQL.jpg', info:'../cursos-mas-info/sql.html', id:'sql'},
    // { codigo: 365, nombre: 'MongoDB', precio: 15000, vacantes: 25, categoria: 'Base de datos', duracion:'9 semanas' ,detalles: 'Explora bases de datos NoSQL y cómo trabajar con documentos JSON en MongoDB.', cuotas: false, foto: '../img/Curso-mongoDB.jpg', info:'../cursos-mas-info/mongo.html', id: 'mongo'},
    // { codigo: 215, nombre: 'Node JS', precio: 16000, vacantes: 28, categoria: 'Programación', duracion:'10 semanas' ,detalles: 'Construye aplicaciones del lado del servidor eficientes y escalables con Node.js.', cuotas: false, foto: '../img/Curso-node-js.jpg', info:'../cursos-mas-info/node.html', id: 'node'},
    // { codigo: 299, nombre: 'PHP y MySQL', precio: 44000, vacantes: 26, categoria: 'Programación/Base de datos', duracion:'24 semanas' ,detalles:'Desarrolla aplicaciones web dinámicas y conecta con bases de datos MySQL utilizando PHP.' , cuotas: true, foto: '../img/Curso-php-mysql.jpg', info:'../cursos-mas-info/php.html', id:'php'},
    // { codigo: 231, nombre: 'Python desde cero', precio: 40000, vacantes: 38, categoria: 'Programación', duracion:'20 semanas' ,detalles: 'Inicia tu viaje en Python, uno de los lenguajes más versátiles y utilizados en el mundo.', cuotas: true, foto: '../img/Curso-Python.jpg', info:'../cursos-mas-info/python.html', id:'python'},
]


const getAll = _ => productos
const get = id => productos.find(p => p.id == id)
const set = prods => productos = prods
const guardar = prod => productos.push(prod)

const actualizar = (id, producto) => {
    const index = productos.findIndex(p => p.id == id)
    productos.splice(index,1,producto)
}

const eliminar = (id) => {
    const index = productos.findIndex(p => p.id == id)
    productos.splice(index,1)
}

export default {
    getAll,
    get,
    set,
    guardar,
    actualizar,
    eliminar
}