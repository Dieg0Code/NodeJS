const { inquirerMenu, pause, readInput } = require("./helpers/inquirer");
const { saveDB, readDB } = require("./helpers/saveFile");
const Tareas = require("./models/tareas");


console.clear();



const main = async() => {

    let opt = '';
    const tareas = new Tareas();

    const tareasDB = readDB();

    if(tareasDB) {
        tareas.cargarTareasFromArray( tareasDB  );
    }

    do {

        // Muestra el menú
        opt = await inquirerMenu();
        
        switch (opt) {
            case '1':
                const desc = await readInput('Descripción: ');
                tareas.crearTarea(desc);
                break;
            case '2':
                console.log(tareas.listadoArray);
                break;
        }

        saveDB( tareas.listadoArray );
    
        await pause();

        
    } while (opt !== '0');


}

main();