'use strict';

// var http = require("http");
var https = require("https");

var action = {
	protocol: 'http',
    options: {
        "host": "",
        "port": "",
        "path": "",
        "method": "",
        "headers": ""
    },
    request: function (options, data, onResult) {
        var port = https;
        var req = port.request(options, function (res) {
            var response = {
                "result":"",
                "message":""
            };
            res.setEncoding('utf8');
            res.on('data', function (chunk) {
                response.result += chunk;
            });
            res.on('end', function () {
                response.status = true;
                response.message = "Success";
                onResult(response);
            });
        });
        if(data.length>3)
            req.write(data) ;
        req.on('error', function (err) {
            var response = {} ;
            response.status = false;
            response.result = {};
            response.message = "Error: " + err;
            onResult(response);
        });

        req.end();
    }
};

module.exports = action;