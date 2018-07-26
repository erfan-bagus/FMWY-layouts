const express = require('express');
const app = express();
const mainsystem = require('./application/system/main');


mainsystem.start(app);

module.exports = app;