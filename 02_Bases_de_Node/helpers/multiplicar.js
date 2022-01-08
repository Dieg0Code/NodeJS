const fs = require('fs');
const colors = require('colors');


const crearArchivo = async(base = 5, listar = false, hasta = 10) => {

    try {

        let salida = '';
        let consola = '';

        for (let i = 1; i <= hasta; i++) {
        
            salida += `${base} * ${i} = ${base * i}\n`;
            consola += `${base} ${'x'.yellow} ${i} ${'='.yellow} ${base * i} \n`;
        
        }
        
        if (listar) {

            console.log('========================='.yellow);
            console.log('    Tabla del:'.yellow,colors.red(base));
            console.log('========================='.yellow);

            console.log(consola);
        }
    
        fs.writeFileSync(`./out/tabla-${base}.txt`, salida);
    
        return `Archivo tabla-${base}.txt`;
        
    } catch (error) {
        throw error;
    }

    

}

module.exports = {
    crearArchivo
}