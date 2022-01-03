const { crearArchivo } = require('./helpers/multiplicar');
const argv = require('./config/yargs');

console.clear();



//const base = 9;


crearArchivo(argv.b, argv.l)
    .then(nombreArchivo => console.log(nombreArchivo, 'creado'))
    .catch(err => console.log(err));