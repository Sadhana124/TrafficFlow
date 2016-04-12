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
    //Move into common method

    console.log(req.body);

    var file = "./test.db";
    var exists = fs.existsSync(file);

    var db = new sqlite3.Database(file);
    db.serialize(function() {
        if(!exists) {
            db.run("CREATE TABLE traffic (" +
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
        }
    });
    //Move into common method

    //TODO: Make query correctly
    var query = 'SELECT * FROM traffic';

    db.all(query, function(err, rows) {
        res.json(JSON.stringify(rows));
    });

    db.close();

});

module.exports = router;