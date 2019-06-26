var db = require('../dbconnection');
var passwordHash = require('password-hash');
var user = {

    getAllusers: function (callback) {

        return db.query("Select * from user", callback);

    },
    
    addUser: function (firstname,lastname,username,password, callback) {
        var hashedPassword = passwordHash.generate(password);
        var insertSql = "INSERT INTO user SET ?";
                        var insertValues = {
                            "firstname" :firstname,
                            "lastname" : lastname,
                            "username" : username,
                            "password" : hashedPassword

                        };
                        
                        
                         return db.query(insertSql, insertValues, callback);
                         
    }
    
    

};
module.exports = user;


