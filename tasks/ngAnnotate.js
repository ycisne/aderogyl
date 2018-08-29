module.exports = {
    options: {
        singleQuotes: true
    },
    app: {
        files: [{
            expand: true,
            cwd: 'src/app/',
            src: ['**/*.js'],
            dest: 'dist/mapping/js'
        }]
    }
}