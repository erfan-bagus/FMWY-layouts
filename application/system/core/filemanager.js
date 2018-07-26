const fs = require('fs');
const path = require('path');
const url_path = path.join(__dirname, './../../../');
module.exports = {

    findFiles: function (url, ext, monitoring) {
        var listmonitoring = [];
        listmonitoring['list'] = [];

        listmonitoring['url'] = url_path + url;
        fs.readdirSync(url_path + url).forEach(function (file, index) {
            if (file.substr(-3) == ext) {

                listmonitoring['list'].push(file);
            }
        });
        if (monitoring == true) { console.log(listmonitoring); }
        return listmonitoring;
    },
    path_join: function (url1, url2) {
        return path.join(url1, url2);
    }

}