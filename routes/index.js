var express = require('express');
var router = express.Router();
var user = require('../models/user');


router.get('/', function (req, res, next) {
    
    
        user.getAllusers(function (err, rows) {

            if (err) {
                res.json(err);
            }
            else {
                res.json(rows);
            }

        });
    
});

router.post('/', function (req, res, next) {

    user.addUser(req.body.firstname,req.body.lastname,req.body.username,req.body.password, function (err, count) {
        if (err) {
            res.json(err);
        }
        else {
            res.json(req.body);
        }
    });
});

module.exports = router;