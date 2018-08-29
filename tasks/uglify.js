module.exports = {
	options: {
		mangle: false,
      	compress: {
        	drop_console: true
      	}
    },
	js : {
		src  : ['./dist/app/app.js'],
		dest : './dist/app/app.js'
	}
}