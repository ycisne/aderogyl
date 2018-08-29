ESTRUCTURA PROYECTO
===================

    /dist 
        (Este directorio se genera cuando se compilan/minifica los diferentes componentes (JS, Html, Stly) utilizando las dependencias provistas desde NPM y la ejecución de las tareas definidas en Grunt)
    /node_modules 
        (Dependencias utilizadas para testing, tareas de Grunt)
	/src 
        (Conjunto de archivos fuente)
    /tasks 
        (Conjunto de tareas del Gestor Grunt para deployar la app)
    gruntfile.js
        (Configuración de las tareas que permiten compilar, minificar los componentes del proyecto y ejecutar los tests)
	package.json
		(Definición de las dependencias que se resolveran con NPM)

INSTALACIÓN DEPENDENCIAS DESARROLLO
===================================

1 - Software necesario para instalar proyecto Desarrollo:
    - Node.js: https://nodejs.org/en/download/ (VERSION >= 6 )
    - Grunt de forma global [npm install grunt -g]

2 - Dependencias NPM
    - En la consola de comando [CMD] correr el comando "npm install", esto descargará un conjunto de librerias definidas en el archivo "package.json" como son los frameworks para los test y la automatización de tareas como Grunt, Jade, minificación entre otros.

DEPLOY
======
- Archivos y Directorios que componen el DEPLOY
    - index.html
    - dist/

- Para Generar un deploy para el ambiente de Producción se debe utilizar la tarea de grunt "build" para esto ejecutar en una consola de comando en el directorio y ejecutar el comando "grunt build" esto realizará las siguientes tareas:
        - Generación de CSS a partir los programado en los archivos scss
        - Merge de los archivos vendors y eliminación de código, console.log de los JS de la aplicación
        - Merge de los archivos JS y CSS de componen la aplicación
        - Copia de los Fuentes e Imagenes utilizadas
        - Compilación de archivos JADE a HTML
        - Minificación de JS, Css y Html

DEBUGGING
=========

    - grunt dev: genera el sitio sin minificar el código. Observa cambios. Levanta un servidor para poder navegar el sitio.[http://localhost:3000]

    - grunt server: genera el build del sitio (contenido minificado, como va a producción). Observa cambios. Levanta un servidor para poder navegar el sitio. [http://localhost:3000]

    - grunt connect: ejecuta servidor local para navegar el sitio.
	Para configurar el IP y puerto de este servidor se debe configurar en el archivo tasks/httpServer.js la sección "httpServer"

    - grunt test-deploy: genera el sitio con la tarea "grunt-build" y la levanta en un servidor para poder navegar el sitio. No observa cambios, es con fin de ver la aplicación tal y como se ve en el servidor. [http://localhost:3000]