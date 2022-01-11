const inquirer = require('inquirer');
require('colors');

const menuOptions = [
    {
        type: 'list',
        name: 'option',
        message: '¿Qué desea hacer?',
        choices: ['opt1', 'opt2', 'opt3']
    }
]

const inquirerMenu = async () => {

    console.clear();
    console.log('==========================================================='.green);
    console.log('Bienvenido a la aplicación de gestión de tareas'.green);
    console.log('===========================================================\n'.green);

    const opt = await inquirer.prompt(menuOptions);

    return opt;

}

module.exports = {
    inquirerMenu
}