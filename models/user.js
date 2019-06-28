var db = require('../dbconnection');
//var passwordHash = require('password-hash');
const Cryptr = require('cryptr');
const cryptr = new Cryptr('myTotalySecretKey');

var user = {

    getAllusers: function (callback) {

        return db.query("Select * from user", callback);

    },
    
    addUser: function (firstname,lastname,username,password, callback) {
        var hashedPassword = cryptr.encrypt(password);
        var insertSql = "INSERT INTO user SET ?";
                        var insertValues = {
                            "firstname" :firstname,
                            "lastname" : lastname,
                            "username" : username,
                            "password" : hashedPassword

                        };
                        
                        
                         return db.query(insertSql, insertValues, callback);
                         
    },
    checkUser: function (username, callback) {
        return db.query("select  *  from user where username=? LIMIT 1", [username], callback);
    }
    
    

};
module.exports = user;


