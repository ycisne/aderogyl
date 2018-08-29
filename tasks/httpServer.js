
module.exports = {
	'dev': {
        root: "./dist",
        port: 3000,
        host: "127.0.0.1",
        cache: 10,
        showDir : true,
        autoIndex: true,
        ext: "html",
        runInBackground: false,
        logFn: function(req, res, error) { }
    },
    'devbuild': {
        root: './Deployment',
        port: 3000,
        host: "127.0.0.1",
        cache: 10,
        showDir : true,
        autoIndex: true,
        ext: "html",
        runInBackground: false,
        logFn: function(req, res, error) { }
    }
}