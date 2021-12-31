# Reforzamiento Javascript

## Const vs Let vs Var

Const, let y var son tres palabras clave para declarar variables en Javascript, pero cada una tiene una característica diferente respecto a la otra.

### Var

`var` es la forma más antigua de declarar variables, pero no es la mejor forma de hacerlo ya que trae problemas debido a que crea la variable globalmente, es decir, su scope es global. Esto trae consigo problemas de mantenibilidad en el código, ya que nos es difícil saber el estado de las variables en el momento de ejecución.


### Let

`let` es la forma en la que se soluciona el problema de las variables globales, al declarar variables con `let` se crea un scope local, es decir, se respeta el ámbito en el que fue declarada la variable, por lo que su ciclo de vida se acota a ese scope. Esto se asemeja más a como funciona la declaración de variables en otros lenguajes, por lo que es mas intuitivo y menos confuso que la forma de declarar variables con `var`.

### Const

`const` es diferente, ya que no estamos declarando variables, sino que estamos declarando constantes, es decir, variables que no pueden ser modificadas luego de que fueron declaradas. Al igual que con `let` se respeta el ámbito en el que fue declarada la variable, por lo que podemos usar el mismo nombre de variable en diferentes scope.

Por lo general si sabemos que una variable no va a cambiar de valor la declaramos con `const`, pero si sabemos que va a cambiar de valor la declaramos con `let`.

## Template Literals

Por lo general para concatenar variables dentro de un string se suele hacer asi:

```javascript
const nombre = 'deadpool';
const real = 'Wade Winston';
// y para concatenar
const normal = 'El nombre de ' + nombre + ' es ' + real;
```

Pero existe una forma más intuitiva de hacerlo usando template literals, que es usar `${}` para concatenar variables dentro de un string:

```javascript
const nombre = 'deadpool';
const real = 'Wade Winston';
// y para concatenar
const template = `El nombre de ${nombre} es ${real}`;
```

Usamos los backticks `` ` ` `` para delimitar el string, y dentro de ellos usamos la interpolación de variables, lo cual significa que concatenamos el valor de la variable dentro del string.

Esto nos sirve no solo para mostrar el valor de una variable, sino que también podemos hacer operaciones matemáticas dentro de los strings, por ejemplo:

```javascript
const a = 10;
const b = 20;

const template = `El resultado de la suma es ${a + b}`;
```

Otra ventaja de usar los backticks es que podemos declarar strings multilínea, por ejemplo:

```javascript
const html = `
<h1>Hola mundo</h1>
<p>Esto es un párrafo</p>
`;

console.log(html);
```

## Desestructuración de objetos

La desestructuración de objetos es una forma de extraer valores de un objeto para luego asignar esos valores a variables.

Por ejemplo, si tenemos un objeto con la siguiente estructura:

```javascript
const deadpool = {
  nombre: 'Wade',
  apellido: 'Winston',
  poder: 'Regeneración',
  getNombre() {
    return `${this.nombre} ${this.apellido} - ${this.poder}`;
  }
};

// Para extraer los valores de este objeto podemos usar la sintaxis de desestructuración de objetos:

const { nombre, apellido, poder } = deadpool;
```

También podemos poner valores por defecto en las variables que queremos, por ejemplo:

```javascript
const { nombre, apellido, poder, edad = 0 } = deadpool;
// Si no existe una propiedad en el objeto, se le asigna el valor por defecto
// De esta forma nos evitamos que devuelva undefined si es que no existe la propiedad
```

Otro uso muy interesante de la desestructuración es que puedo desestructurar un objeto dentro de una función, por ejemplo:

```javascript

function printHero({ nombre, apellido, poder, edad = 0 }) {
  console.log(nombre, apellido, poder, edad);
}

printHero(deadpool);
```

También podemos desestructurar un array, por ejemplo:

```javascript

const heroes = ['Deadpool', 'Superman', 'Batman'];

const [ h1, h2, h3 ] = heroes;

console.log(h1, h2, h3); // Deadpool Superman Batman
```

## Arrow Functions

Las funciones de flecha son una forma de escribir funciones en Javascript.

La forma clásica de escribir una función es la siguiente:

```javascript

function sumar(a, b) {
  return a + b;
}

console.log(sumar(1, 2));
```

Por otro lado las funciones de flecha se escriben de la siguiente forma:

```javascript

const sumar = (a, b) => {
  return a + b;
};

console.log(sumar(1, 2));
```

Una característica muy importante de las funciones flecha es que podemos declararlas en una sola línea, de la siguiente forma:

```javascript

const sumar = (a, b) => a + b;

```

Nos podemos ahorrar la necesidad de escribir la palabra `return` y también de escribir `{}` cuando la función es simple.

Si necesitamos una función que no recibe parámetros podemos escribirla de la siguiente forma:

```javascript

const saludar = () => 'Hola Mundo';

```

## Callbacks

Los callbacks son funciones que se pasan como parámetros a otras funciones, por ejemplo:

```javascript

setTimeout(() => {
  console.log('Hola mundo');
}, 3000);

```

```javascript

const getUserById = (id, callback) => {

    const user = {
        id,
        nombre: 'Wade'
    }

    setTimeout(() => {
        callback(user);
    }, 1500);

}

getUserById(10, (user) => {
    console.log( user.id );
    console.log( user.nombre.toUpperCase() );
});
```

## Problemas comunes con los callbacks

Existe algo llamado "callback hell" donde hay un callback dentro de otro callback dentro de otro callback, y así sucesivamente. Lo cual hace prácticamente imposible identificar qué función es la que se está ejecutando.

```javascript

const empleados = [
  {
    id: 1,
    nombre: 'Wade'
  },
  {
    id: 2,
    nombre: 'Bruce'
  },
  {
    id: 3,
    nombre: 'Tony'
  }
];

const salarios = [
  {
    id: 1,
    salario: 1000
  },
  {
    id: 2,
    salario: 2000
  }
];

const getEmpleado = ( id, callback ) => {
  
  const empleado = empleados.find( (e) => e.id === id )?.nombre;

  if(empleado) {
    callback(null, empleado);
  } else {
    callback(`Empleado con id ${id} no existe`);
  }

}

const getSalario = (id, callback) => {
  const salario = salarios.find( (s) => s.id === id )?.salario;

  if (salario) {
    callback(null, salario);
  } else {
    callback(`No existe salario para el id ${id}`);
  }
}

const id = 1;

getEmpleado(id, (err,empleado) => {

  if (err) {
    console.log('ERROR!');
    return console.log(err);
  }

  getSalario(id, (err, salario) => {

  if (err) {
    return console.log(err);
  }

  console.log(`El empleado ${empleado} tiene un salario de ${salario}`);
  });

});

```

El problema de trabajar con los callbacks de esta forma es que las funciones que reciben un callback pueden tener dentro de ellas otra función que recibe otro callback, esto se puede anidar prácticamente de forma infinita, lo que hace que la función sea muy confusa porque no sabemos en que punto suceden las cosas.

Siempre debemos evitar los callback hell.

## Promesas

Las promesas en javascript son muy útiles para evitar los callback hell, pero si no las usamos bien pueden resultar incluso mas confuso que el callback hell.

```javascript

const empleados = [
  {
    id: 1,
    nombre: 'Wade'
  },
  {
    id: 2,
    nombre: 'Bruce'
  },
  {
    id: 3,
    nombre: 'Tony'
  }
];

const salarios = [
  {
    id: 1,
    salario: 1000
  },
  {
    id: 2,
    salario: 2000
  }
];

const getEmpleado = (id) => {
  
  return new Promise( (resolve, reject) => {
    
    const empleado = empleados.find( (e) => e.id === id )?.nombre;

    (empleado)
      ? resolve(empleado)
      : reject(`Empleado con id ${id} no existe`);
    }
  });

}

const getSalario = (id) => {
  
  return new Promise(resolve, reject) => {

    const salario = salarios.find( (s) => s.id === id )?.salario;

    (salario)
      ? resolve(salario)
      : reject(`No existe salario para el id ${id}`);
  }
}

const id = 1;

/*
getEmpleado(id)
  .then(empleado => console.log(empleado));
  .catch(err => console.log(err));

getSalario(id)
  .then(salario => console.log(salario))
  .catch(err => console.log(err));
*/

getEmpleado(id)
  .then(empleado => {

    getSalario(id)
      .then(salario => {
        console.log(`El empleado ${empleado} tiene un salario de ${salario}`);
      })
      .catch(err => console.log(err));

  })
  .catch(err => console.log(err));

```

Aún así se hace difícil de entender, pero podemos trabajarlo de una manera más sencilla usando promesas en cadena.

## Promesas en cadena

Podemos mejorar el código anterior de la siguiente manera:

```javascript

let nombre;

getEmpleado(id)
  .then(empleado => {
    nombre = empleado;
    return getSalario(id)
  })
  .then(salario => console.log(`El empleado ${nombre} tiene un salario de ${salario}`))
  .catch(err => console.log(err));
```

## Async - Await

El `Async` y el `Await` es un termino muy popular que rodea al mundo de las promesas. En pocas palabras el `Await` le dice a javascript que espere a que se devuelva la respuesta de la promesa, cuando tenga la respuesta de la promesa se le asigna a donde sea que lo necesitemos. El único inconveniente es que el `Await` debe estar dentro de una función o método asíncrono.

```javascript

const empleados = [
  {
    id: 1,
    nombre: 'Wade'
  },
  {
    id: 2,
    nombre: 'Bruce'
  },
  {
    id: 3,
    nombre: 'Tony'
  }
];

const salarios = [
  {
    id: 1,
    salario: 1000
  },
  {
    id: 2,
    salario: 2000
  }
];

const getEmpleado = (id) => {
  
  return new Promise( (resolve, reject) => {
    
    const empleado = empleados.find( (e) => e.id === id )?.nombre;

    (empleado)
      ? resolve(empleado)
      : reject(`Empleado con id ${id} no existe`);
    }
  });

}

const getSalario = (id) => {
  
  return new Promise(resolve, reject) => {

    const salario = salarios.find( (s) => s.id === id )?.salario;

    (salario)
      ? resolve(salario)
      : reject(`No existe salario para el id ${id}`);
  }
}

const getUserInfo = async() => {

  try {
    
    const empleado = await getEmpleado(id);
    const salario = await getSalario(id);

    return `El salario de ${empleado} es de ${salario}`;

  } catch (err) {

    throw err;
    
  }

}

const id = 1;

getUserInfo(id)
  .then(userInfo => console.log(userInfo));
  .catch(err => console.log(err));

```

Cuando le ponemos el `async` a un función lo que hacemos es transformarla para que regrese una promesa.