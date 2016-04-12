/**
 * Created by SadhanaRamachandran on 4/11/16.
 */
var express = require('express');

var fs = require("fs");
var sqlite3 = require('sqlite3').verbose();

var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('admin', { title: 'Express' });
});

router.post('/insert', function(req, res) {
    console.log(req.body);

    //Move into common method
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

    var stmt = db.prepare("INSERT INTO traffic (" +
        "ts, " +
        "destination_ip," +
        "destination_vn," +
        "direction_ingress," +
        "destination_port," +
        "protocol," +
        "source_ip," +
        "source_vn," +
        "source_port," +
        "sum_bytes_kb," +
        "sum_packets)" +
        " VALUES (?,?,?,?,?,?,?,?,?,?,?)");

    stmt.run(
        req.body.timestmp,
        req.body.dest_ip,
        req.body.dest_vn,
        req.body.dir_ingress,
        req.body.dest_port,
        req.body.protocol,
        req.body.source_ip,
        req.body.source_vn,
        req.body.source_port,
        req.body.sum_bytes_kb,
        req.body.sum_packets
    );

    stmt.finalize();

    db.close();

    res.render('admin', { title: 'Express' });
});

module.exports = router;