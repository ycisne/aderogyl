module.exports = {
    js: {
        options: {
            banner: '/*! versión <%= versionTemplate %> - ' +
                    '<%= grunt.template.today("dd-mm-yyyy hh:MM") %> */\n\r' +
                    '(function ($) {',
            footer: '})(jQuery);'
        },
        src: ['dist/mapping/js/**/*.js'],
        dest: 'dist/app/app.js', 
    },
    css: {
            src: ['dist/mapping/css/**/*.css'],
            dest : 'dist/app/assets/css/app.css'
    }
}