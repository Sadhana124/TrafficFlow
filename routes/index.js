var express = require('express');
var router = express.Router();

var fs = require("fs");

var sqlite3 = require('sqlite3').verbose();

data = {
    title: 'Network FLow Query',
    availableAttributes : ['Destination ip', 'Destination vn', 'Direction ingress',
        'Destination port', 'Protocol', 'Source ip', 'Source vn', 'Source port', 'Sum of bytes', 'Sum of packets'],
    conditions : ['=', '!=', '<', '>', '<=', '>=', 'in', 'like']
}

router.get('/', function(req, res, next) {
    res.render('index', data);
});

router.post('/test', function(req, res)
{
    console.log("got the test psot request");
    res.end('callback(\'{\"msg\": \"OK\"}\')');
});

router.post('/query', function(req, res) {
    console.log(req.body);

    //Move into common method
    var file = "./test.db";
    var db = new sqlite3.Database(file);
    db.serialize(function() {
        db.run("CREATE TABLE IF NOT EXISTS traffic (" +
            "ts INTEGER, " +
            "destination_ip TEXT, " +
            "destination_vn TEXT," +
            "direction_ingress INTEGER, " +
            "destination_port INTEGER, " +
            "protocol INTEGER, " +
            "source_ip TEXT," +
            "source_vn TEXT, " +
            "source_port INTEGER, " +
            "sum_bytes_kb INTEGER, " +
            "sum_packets INTEGER)");
    });
    //Move into common method

    //TODO: Make query correctly

    var params = req.body;
    var from = params['from'];
    var to = params['to'];

    delete params['from']; delete params['to'];

    var select_fields = [];
    for(var key in params) {
        if(params.hasOwnProperty(key) && params[key] == 'on') {

            select_fields.push(key);
            delete params[key];
        }
    }

    var query = 'SELECT ' + select_fields.join() + " FROM traffic WHERE " + "ts > " + from + " AND ts < " + to;

    var index = 1;
    while(true) {
        var combiner = 'combiner-'+index;
        var condAttr= 'condAttr-'+index;
        var condValue = 'condValue-'+index;
        var op = 'op-'+index;

        if (! (combiner in params)) {
            break;
        }

        query += " " + params[combiner] + " " + params[condAttr] + " " + params[op] + " " + params[condValue];
        index++;
    }

    db.all(query, function(err, rows) {
        res.json(JSON.stringify(rows));
    });

    db.close();
});

module.exports = router;