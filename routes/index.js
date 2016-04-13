var express = require('express');
var router = express.Router();

var fs = require("fs");

var sqlite3 = require('sqlite3').verbose();

data = {
    title: 'Network FLow Query',
    availableAttributes : ['Destination_ip', 'Destination_vn', 'Direction_ingress',
        'Destination_port', 'Protocol', 'Source_ip', 'Source_vn', 'Source_port', 'Sum_of_bytes', 'Sum_of_packets'],
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

    var mapping = {};
    mapping['Destination_ip']    = 'destination_ip';
    mapping['Destination_vn']    = 'destination_vn';
    mapping['Direction_ingress'] = 'direction_ingress';
    mapping['Destination_port']  = 'destination_port';
    mapping['Protocol']          = 'protocol';
    mapping['Source_ip']         = 'source_ip';
    mapping['Source_vn']         = 'source_vn';
    mapping['Source_port']       = 'source_port';
    mapping['Sum_of_bytes']      = 'sum_bytes_kb';
    mapping['Sum_of_packets']    = 'sum_packets';

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

    var query = 'SELECT ';
    for (var i = 0; i < params['selectedAttr'].length; i++) {
        params['selectedAttr'][i] = mapping[params['selectedAttr'][i]] + ' AS ' + params['selectedAttr'][i];
    }

    if('selectedAttr' in params) {
        query += params['selectedAttr'].join();
    } else {
        query += '*'
    }

    query += " FROM traffic WHERE " + "ts > " + params['from'] + " AND ts < " + params['to'];

    for (var i = 0; i < params['whereConditions'].length; i++) {
        params['whereConditions'][i]['condAttr'] = mapping[params['whereConditions'][i]['condAttr']];

        query += " " +
            params['whereConditions'][i]['combiner'] + " " +
            params['whereConditions'][i]['condAttr'] + " " +
            params['whereConditions'][i]['op'] + " " +
            params['whereConditions'][i]['condValue'];
    }

    db.all(query, function(err, rows) {
        res.json(JSON.stringify(rows));
    });

    db.close();
});

module.exports = router;