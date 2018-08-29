/**
 * Gruntfile.js
 */

module.exports = function(grunt){
    'use strict';

    var packageInfo = grunt.file.readJSON('package.json');
    var nowTime = Date.now();
    
    // Pasar la nformación del package al grunt.config
    grunt.config('packageInfo', packageInfo);

    // Inicializar la configuración de los objetos en al proyecto
    grunt.initConfig({
        // Método para que Grunt accesa a la propiedad pkg.packageInfo de cada objeto
        pkg             : packageInfo,
        // Variable para definir la fecha actual
        ahora           : nowTime,
        // Template para el nombre de archivos
        versionTemplate : '-<%= pkg.name %>-<%= grunt.template.date(ahora, "yyyymmddHHMMss") %>',

        // Agregar, remover y rebuild las anotacions de las injecciones de dependencias
        ngAnnotate      : require('./tasks/ngAnnotate'),
        
        // Concatenar archivos
        concat          : require('./tasks/concat'),

        // Borrar archivos / carpetas
        clean           : require('./tasks/clean'),

        // Minificar archivos con UglifyJS
        uglify          : require('./tasks/uglify'),

        // Comprimir css's
        cssmin          : require('./tasks/cssmin'),

        // Compilar archivos .styl
        stylus          : require('./tasks/stylus'),

        // Aplicar prefixier a css's
        postcss         : require('./tasks/postcss'),

        // Crear html's
        jade         : require('./tasks/jade'),

        // Correr procesos al cambio
        watch           : require('./tasks/watch'),
        
        // Copiar archivos
        copy            : require('./tasks/copy'),
        
        // Correr servidor local
        'http-server'   : require('./tasks/httpServer'),

        // Correr varios procesos a la vez
        concurrent      : require('./tasks/concurrent'),

        // Creamos el bundle de los archivos vendor desde el index
        builder         : require('./tasks/builder'),

        // Procesar el html para quitar las dependencias una vez hecho los bundle de los vendors
        processhtml     : require('./tasks/processhtml'),
        
        // Quitar código innecesario del javascript (console.log, comentarios, código, etc.)
        strip           : require('./tasks/strip'),
        strip_code      : require('./tasks/stripCode'),

        // Validar código JS
        jshint          : require('./tasks/jshint'),

    });

    // Cargamos múltiples tareas del Grunt
    require('load-grunt-tasks')(grunt);

    // Copiar imágenes, fuentes y archivos necesarios
    grunt.registerTask('copy:all', ['copy:img', 'copy:fonts']);

    // Hacemos el build del los vendor JS y CSS, así como cambiar la referencia en el index.html
    grunt.registerTask('vendor', [
        'builder',
        'processhtml'
      ]);

    
    // Tareas para vigilar archivos -> Comprimidos
    grunt.registerTask('cssfilesMin', [
        'stylus:compile', 
        'concat:css',
        'postcss', 
        'cssmin', 
        'clean:mapClean'
      ]);
    
      grunt.registerTask('scriptsMin', [
        'ngAnnotate',
        'concat:js', 
        'jshint',
        'uglify', 
        'clean:mapClean'
      ]);
    
    // Tareas para vigilar archivos -> Sin comprimir
    grunt.registerTask('scripts', [
        'ngAnnotate',
        'concat:js',
        'jshint',
        'clean:mapClean'
      ]);
    grunt.registerTask('cssfiles', [
        'stylus:compile', 
        'concat:css',
        'postcss',
        'clean:mapClean'
      ]);

    // Tareas comunes
    grunt.registerTask('initialize', [
        'clean:dist',
        'copy:all',
        'ngAnnotate',
        'stylus',
        'jshint',
        'concat',
        'postcss',
        'jade'
    ]);

    // Conectar el servidor
    grunt.registerTask('connect', ['http-server:dev']);

    // Correr el servidor y watch
    grunt.registerTask('serve', ['concurrent:prod']);
    
    // Correr el servidor y watch en desarrollo
    grunt.registerTask('dev', ['concurrent:dev']);

    /***** TAREAS PARA DEPLOY EN DEV / TEST / DEPLOY ******/
    //  Hacemos el build y mapping para debugger en el ambiente de desarrollo
    grunt.registerTask('debug', [
        'initialize',
        'vendor',
        'clean:mapClean'
      ]);

    // Copiamos y hacemos el build de los archivos minificados en la carpeta 'dist'
    grunt.registerTask('build', [
	    'initialize',
        'strip',
        'strip_code',
        'uglify', 
        'cssmin',
        'vendor',
        'clean:mapClean'
    ]);

    // Copiamos a la carpeta 'Deployment' los archivos para el deploy
    grunt.registerTask('deploy', [
        'clean:deployment',
        'build',
	    'copy:deploy'
    ]);

    // Para probar el deploy en el local
    grunt.registerTask('test-deploy', [
	    'deploy',
        'http-server:devbuild'
    ]);

};