const { inquirerMenu, pause, readInput, borrarTareaMenu, confirmarBorrado, mostrarListadoCheckList } = require("./helpers/inquirer");
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
                tareas.listadoCompleto();
            break;
            case '3': // listar completadas
                tareas.listarPendientesCompletadas(true);
            break;
            case '4': // listar pendientes
                tareas.listarPendientesCompletadas(false);
            break;
            case '5': // completado | pendiente
                const ids = await mostrarListadoCheckList(tareas.listadoArray);
                tareas.toggleCompletadas(ids);
            break;
            case '6': // Borrar tarea
                const id = await borrarTareaMenu( tareas.listadoArray );
                
                if(id !== '0') {
                    const confirmar = await confirmarBorrado('¿Está seguro?');
                    if(confirmar) {
                        tareas.borrarTarea(id);
                        console.log('Tarea borrada'.green);
                    }
                }

            break;
        }

        saveDB( tareas.listadoArray );
    
        await pause();

        
    } while (opt !== '0');


}

main();