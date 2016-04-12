var express = require('express');
var router = express.Router();

/* GET home page. */

data = {
    title: 'Network FLow Query',
    availableAttributes : ['Destination ip', 'Destination vn', 'Direction ingress',
    'Destination port', 'Protocol', 'Source ip', 'Source vn', 'Source port', 'Sum of bytes', 'Sum of packets'],
}

router.get('/', function(req, res, next) {
  res.render('index', data);
});

module.exports = router;
