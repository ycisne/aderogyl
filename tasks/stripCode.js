module.exports = {
    options: {
        blocks: [
            {
                start_block: "/* start-dev-block */",
                end_block: "/* end-dev-block */"
            }
        ]
    },
    files: {
        src: 'dist/**/*.js'
    }
}