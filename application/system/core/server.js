const http = require('http');

module.exports = {

    run: function (port, _app) {

        http.createServer(_app).listen(port, function () {
            console.log('\x1b[33m' + 'Express server listening on port : ' + '\x1b[32m' + port + '\x1b[0m');
        });
    },
}