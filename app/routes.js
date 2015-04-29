var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
    res.render('basicInfo');
});

router.get('/basicInfo', function(req, res) {
    res.render('basicInfo');
});



module.exports = router;