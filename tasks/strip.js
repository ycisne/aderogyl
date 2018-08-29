module.exports = {
    main : {
        src : 'dist/**/*.js',
        options : {
            inline: true,
            nodes : [
                'console',
                'console.info',
                'console.debug',
                'console.error',
                 'debug',
                 '$log.log',
                 '$log.info', 
                 '$log.warn', 
                 '$log.error', 
                 '$log.debug',
                 'window.console',
            ]
        }
    }
}