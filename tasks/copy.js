module.exports = {
	img: {
        files: [{
            expand: true,
            cwd: 'src/assets/img',
            src: '**',
            dest: 'dist/app/assets/img'
        }]
    },
    fonts: {
        files: [{
            expand: true, 
            flatten: true, 
            src: ['src/assets/fonts/**'], 
            dest: 'dist/app/assets/fonts', 
            filter: 'isFile'
        }]
    },
	deploy: {
        files: [{
            expand: true,
            cwd: './',
            src: ['dist/**/*'],
            dest: 'Deployment'
        }]
    }
}