var path = require('path');
var fs = require('fs');
var uuid = require('node-uuid');


exports.getHtml = function (req, res) {
    res.sendFile(path.join(__dirname, '../../client/index.html'));
}


