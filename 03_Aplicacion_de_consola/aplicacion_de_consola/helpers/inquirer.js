const inquirer = require('inquirer');
require('colors');

const menuOptions = [
    {
        type: 'list',
        name: 'option',
        message: '¿Qué desea hacer?',
        choices: [
            {
                value: '1',
                name: `${'1.'.green} Crear una tarea`
            },
            {
                value: '2',
                name: `${'2.'.green} Listar tareas`
            },
            {
                value: '3',
                name: `${'3.'.green} Listar tareas completadas`
            },
            {
                value: '4',
                name: `${'4.'.green} Listar tareas pendientes`
            },
            {
                value: '5',
                name: `${'5.'.green} Completar tarea(s)`
            },
            {
                value: '6',
                name: `${'6.'.green} Borrar tarea`
            },
            {
                value: '0',
                name: `${'0.'.green} Salir`
            }
        ]
    }
]

const inquirerMenu = async () => {

    console.clear();
    console.log('==========================================================='.green);
    console.log('Bienvenido a la aplicación de gestión de tareas'.white);
    console.log('===========================================================\n'.green);

    const {option} = await inquirer.prompt(menuOptions);

    return option;

}

const pause = async() => {

    const question = [
        {
            type: 'input',
            name: 'enter',
            message: `Presione ${'ENTER'.green} para continuar`
        }
    ];

    console.log('\n');
    await inquirer.prompt(question)

}

const readInput = async( message ) => {

    
    const question = [
        {
            type : 'input',
            name : 'desc',
            message,
            validate ( value ) {
                if( value.length === 0 ) {
                    return 'Porfavor ingrese un valor';
                }

                return true;
            }
        }
    ];

    const { desc } = await inquirer.prompt(question);
    return desc;

}


const borrarTareaMenu = async( tareas = [] ) => {

    const choices = tareas.map( (tarea, index) => {

        const idx = `${index + 1}.`.green;

        return {
            value: tarea.id,
            name:  `${idx}. ${tarea.desc}` 
        }

    });

    choices.unshift({
        value: '0',
        name: '0.'.green + ' Cancelar'
    });

    const question = [
        {
            type: 'list',
            name: 'id',
            message: 'Borrar',
            choices
        }
    ]

    const { id } = await inquirer.prompt(question);
    return id;

}

const confirmarBorrado = async( message ) => {

    const question = [
        {
            type: 'confirm',
            name: 'ok',
            message
        }
    ];

    const { ok } = await inquirer.prompt(question);
    return ok;

}

const mostrarListadoCheckList = async( tareas = [] ) => {

    const choices = tareas.map( (tarea, index) => {

        const idx = `${index + 1}.`.green;

        return {
            value: tarea.id,
            name:  `${idx}. ${tarea.desc}` ,
            checked: (tarea.completadoEn) ? true : false
        }

    });

    const question = [
        {
            type: 'checkbox',
            name: 'ids',
            message: 'Selecciones',
            choices
        }
    ]

    const { ids } = await inquirer.prompt(question);
    return ids;

}


module.exports = {
    inquirerMenu,
    pause,
    readInput,
    borrarTareaMenu,
    confirmarBorrado,
    mostrarListadoCheckList
}