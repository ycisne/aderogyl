// Autoprefixer Configuration Task
module.exports = {
    options: {
        map: true,
        processors: [
            require('autoprefixer')({browsers: 'last 2 versions'})
        ]
    },
    dist: {
        src : 'dist/app/assets/css/app.css'
    }
}