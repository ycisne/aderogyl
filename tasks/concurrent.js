module.exports = {
	options: {
      	logConcurrentOutput: true
   	},
    prod: {
		tasks: ['build', 'connect', 'watch:jade', 'watch:stylusDev', 'watch:scriptsDev', 'watch:postcss']
	},
	dev: {
		tasks: ['debug', 'connect', 'watch:jade', 'watch:stylusDev', 'watch:scriptsDev', 'watch:postcss']	
	}
}