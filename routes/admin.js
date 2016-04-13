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

router.get('/clear', function(req, res) {
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

    db.run('DROP TABLE traffic;');

    res.render('admin', { title: 'Express' });
});

router.get('/clear', function(req, res) {
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

    var data = [
        ['1460487340','10.2.1.3','project1:virtual-network1',1,9117,6,'10.1.1.3','project2:virtual-network2',41322,15328,44000],
        ['1460487341','10.2.1.3','project1:virtual-network1',1,9117,6,'10.1.1.3','project2:virtual-network2',41322,15328,44000],
        ['1460487342','10.2.1.3','project1:virtual-network1',1,9117,6,'10.1.1.3','project2:virtual-network2',41322,15328,44000],
        ['1460487343','10.2.1.3','project1:virtual-network1',1,9117,6,'10.1.1.3','project2:virtual-network2',41322,15328,44000],
        ['1460487344','10.2.1.3','project1:virtual-network1',1,9117,6,'10.1.1.3','project2:virtual-network2',41322,15328,44000],
        ['1460487345','10.2.1.3','project1:virtual-network1',1,9117,6,'10.1.1.3','project2:virtual-network2',41322,15328,44000],
        ['1460487346','10.2.1.3','project1:virtual-network1',1,9117,6,'10.1.1.3','project2:virtual-network2',41322,15328,44000],
        ['1460487347','10.2.1.3','project1:virtual-network1',1,9117,6,'10.1.1.3','project2:virtual-network2',41322,15328,44000],
        ['1460487348','10.2.1.3','project1:virtual-network1',1,9117,6,'10.1.1.3','project2:virtual-network2',41322,15328,44000],
        ['1460487349','10.2.1.3','project1:virtual-network1',1,9117,6,'10.1.1.3','project2:virtual-network2',41322,15328,44000],
    ];

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

    res.render('admin', { title: 'Express' });
});

router.post('/insert', function(req, res) {
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