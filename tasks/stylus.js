module.exports = {

    compile: {
        options: {
            compress: false,
            linenos: false,
            firebug: false,
            // Incluimos los mixins, variables, etc.
            define: {
                global: '../../../../assets/styl/global/*',
                globalView: '../../../assets/styl/global/*',
                globalStyl: 'global/*',
                retina: '../../../../node_modules/retinajs/dist/retina'
            }

        },
        files:[
            {
                expand: true,
                cwd: 'src/assets/styl',
                ext: '.css',
                src: ['**/*.styl'],
                dest: 'dist/mapping/css'
            },
            {
                expand: true,
                cwd: 'src/app/common',
                ext: '.css',
                src: ['**/*.styl'],
                dest: 'dist/mapping/css'
            },
            {
                expand: true,
                cwd: 'src/app/views',
                ext: '.css',
                src: ['**/*.styl'],
                dest: 'dist/mapping/css'
            }
        ]
    }
}
