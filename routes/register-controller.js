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
    
    user.addUser(req.body.firstname,req.body.lastname,req.body.username,req.body.password, function (err, results) {
        if (err) {
            res.json({
                status:false,
                message:'error with query'
            });
        }
        else {
            
            console.log('user registration successful');
            res.redirect("login.html");
        }
    });

});

router.get('/:username?', function (req, res, next) {
    if (req.body.username) {
        user.checkUser(req.body.username, function (err, results) {
            if (err) {
                res.json({
                    status: false,
                    message: 'error with query'
                });
            }
            else {

                console.log('username already present');
                res.redirect("index.html");
            }
        });
    }
});



module.exports = router;