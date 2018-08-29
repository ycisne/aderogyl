module.exports = {
	// Archivos minificados
	stylusMin : {
	    files: ['./src/assets/styl/*.styl'],
	    tasks: ['cssfilesMin']
	},
    scriptsMin : {
        files: ['./src/app/**/*.js', './src/app/app.js', './tasks/**.js'],
        tasks: ['scriptsMin', 'htmlmin']
    },
    // Archivos sin minificar 
    stylusDev : {
    	files: ['**/*.styl'],
		tasks: ['cssfiles', 'scripts', 'processhtml']  	
    },
    scriptsDev : {
        files: ['./src/app/**/*.js', './src/app/app.js', './tasks/**.js'],
        tasks: ['scripts', 'cssfiles', 'processhtml']
    },
	postcss: {
		files: ['**/*.css'],
		tasks: ['postcss']
	},
    // JADE
    jade : {
    	files: ['./src/**/*.jade'],
        tasks: ['jade', 'processhtml'],
        options: {
            interrupt: true
        }
    }
}