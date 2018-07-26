
const express = require('express');
const config = require('../config/config');
const config_database = require('../config/database');
const server = require('./core/server');
const filemanager = require('./core/filemanager');
const database = require('./database/database');

controllers = filemanager.findFiles(config.CONTROLLER_DIR, '.js', false);
models = filemanager.findFiles(config.MODELS_DIR, '.js', false);
view = filemanager.findFiles(config.VIEWS_DIR, '.js', false);



module.exports.start = function (_app) {
    console.log('\x1Bc');
    const app = _app;
    const info_router = [];
    var i = 0, j = 0;
    info_router['index'] = [];
    info_router['isi'] = [];

    if (config.VIEW_ENGINE !== 'html' || config.VIEW_ENGINE !== '') {
        app.set('views', view.url);
        app.set('view engine', config.VIEW_ENGINE);
    }

    app.use(express.static(filemanager.path_join(__dirname, '../../' + 'assets')));

    controllers.list.forEach(function (val, index) {

        let controller = require(controllers.url + '/' + val);

        if (val === config.DEFAULT_CONTROLLER) {
            app.use('/', controller);
            info_router['index'][i] = controller.stack[0].route.stack[0].method + ' ' + controller.stack[0].route.path;
            i++;
        } else {
            app.use('/' + val.replace('.js', '') + '/', controller);
            info_router['isi'][j] = controller.stack[0].route.stack[0].method + ' ' + val.replace('.js', '') + controller.stack[0].route.path
            j++;
        }

    });

    console.log('List Router :');

    info_router['index'].forEach(function (val, index) {
        console.log(val);
    });

    info_router['isi'].forEach(function (val, index) {
        console.log(val);
    });


    app.use(function (req, res, next) {
        // var err = new Error('Not Found');
        // err.status = 404;
        // next(err);
        res.send('not found 404');
    });

    global.views = function (url_file) {
        return view.url + '/' + url_file;
    }
    if (config_database.driver_database === 'mysql' || config_database.driver_database === 'MySQL') {
        global.db = database.driver('mysql', { 'host': config_database.mysql_host, 'user': config_database.mysql_user, 'password': config_database.mysql_password, 'port': config_database.mysql_port, 'database': config_database.mysql_database });
    } else if (config_database.driver_database === 'mongodb' || config_database.driver_database === 'MongoDB') {
        global.db = database.driver('mongodb', { 'host': config_database.mongodb_host, 'user': config_database.mongodb_user, 'password': config_database.mongodb_password, 'port': config_database.mongodb_port, 'database': config_database.mongodb_database });
    }
    server.run(config.PORT, app);
};
