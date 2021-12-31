# Fundamentos de NodeJS

## Introducción

NodeJS es un runtime de ejecución multiplataforma que permite ejecutar código JavaScript en un entorno de servidor. Nos permite acceder al sistema de archivos del equipo, a la información del sistema operativo, a la red, etc. Esta basado en el motor V8 de Google, el cual traduce el código JavaScript a código maquina de forma muy rápida.

¿Que puedo hacer con Node?

- Uso de Sockets para una comunicación en tiempo real Cliente-Servidor.
- Manejo de archivos y directorios, cargas simultáneas de archivos.
- Servidores locales y remotos con información en tiempo real.
- Conexiones a bases de datos.
- Creación de servicios REST.

¿Por qué Node es tan popular?

- Entradas y salidas no realizan bloqueos del servidor.
- Es sumamente rápido y facil de configurar.
- Más de 470 mil paquetes disponibles (es el ecosistema con más librerías en el mundo).
- Utiliza JavaScript como lenguaje de programación.

## Ciclo de vida de un proceso en NodeJS

Cada proceso en NodeJS tiene un ciclo de vida que va desde el momento en que se crea hasta que se destruye.

En node los procesos se ejecutan en 3 pilas:

- Pila de procesos o Call Stack
- Node Apis
- Cola de callbacks

La pila de procesos se encarga de registrar las funciones a ejecutar, las ejecuta y luego las elimina, pero si existe alguna funcion que es asincrona, entonces se pasa a la pila de apis la cual queda al pendiente de esta funcion hasta que se resuelva. Una vez estas funciones asincronas son resueltas estas no pasan directamente a la pila de procesos, sino que Node las pone en la cola de callbacks.

La cola de callbacks son todos los procesos que ya estan listos para ser ejecutados, pero que deben esperar a que la pila de procesos termine de ejecutar todo lo que esta en ella, luego de esto se ejecutan.

Todo esto lo hace NodeJS de forma automatica.

### Nodemon

**Nodemon** es una herramienta de desarrollo que permite ejecutar archivos de JavaScript en tiempo real. Nos evita tener que reiniciar el servidor cada vez que modifiquemos un archivo.

Para instalarlo en windows debemos ejecutar la consola como administrador y escribir:

```bash
npm install -g nodemon
```

En linux podemos ejecutarlo con:

```bash
sudo npm install -g nodemon
```

Es una herramienta muy util a la hora de trabajar con NodeJS.