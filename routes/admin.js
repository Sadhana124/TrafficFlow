/**
 * Created by SadhanaRamachandran on 4/11/16.
 */
var express = require('express');

var fs = require("fs");
var sqlite3 = require('sqlite3').verbose();

var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('admin', { title: 'Admin' });
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

router.get('/test', function(req, res) {
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

    for(var i = 0; i < data.length; i++) {
        stmt.run(
            data[i][0],
            data[i][1],
            data[i][2],
            data[i][3],
            data[i][4],
            data[i][5],
            data[i][6],
            data[i][7],
            data[i][8],
            data[i][9],
            data[i][10]
        );
    }

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

    var timestmp = req.body.timestmp;
    var dest_ip = req.body.dest_ip;
    var dest_vn = req.body.dest_vn;
    var dir_ingress = req.body.dir_ingress;
    var dest_port = req.body.dest_port;
    var protocol = req.body.protocol;
    var source_ip = req.body.source_ip;
    var source_vn = req.body.souce_vn;
    var source_port = req.body.source_port;
    var sum_bytes_kb = req.body.sum_bytes_kb;
    var sum_packets = req.body.sum_packets;

    stmt.run(
        timestmp,
        dest_ip,
        dest_vn,
        dir_ingress,
        dest_port,
        protocol,
        source_ip,
        source_vn,
        source_port,
        sum_bytes_kb,
        sum_packets
    );

    stmt.finalize();

    db.close();

    res.render('admin', { title: 'Express' });
});

module.exports = router;