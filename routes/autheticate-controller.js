var db = require('../dbconnection');
// var passwordHash = require('../node_modules/password-hash/lib/password-hash');
const Cryptr = require('cryptr');
const cryptr = new Cryptr('myTotalySecretKey');
 

var authenticate = function (req, res) {
    var username = req.body.username;
    var password = req.body.password;
     
    db.query('SELECT * FROM user WHERE username = ?', [username], function (error, results, fields) {
        if (error) {
            res.json({
                status: false,
                message: 'there are some error with query'
            })
        }
        else {
            if (results.length > 0) {
                var hashedPassword = cryptr.decrypt(results[0].password);
                
                if (password == hashedPassword) {
                    
                         
                            console.log('successfully authenticated');
                            res.redirect("chat.html");
                         

                    
                    
                } else {
                    res.json({
                        status: false,
                        message: "username and password does not match"
                    });
                }

            }
        }


    });
}

module.exports = authenticate;

