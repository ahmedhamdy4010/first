var db = require.main.require('./models/config');




var createUser = (user_id, user, callback) => {
    var sql = "INSERT INTO users VALUES('" + user_id + "', '" + user.name + "','" + user.phone + "','" + user.email + "', 0,0, '" + user.password + "', '" + user.sub_id + "')";
    db.executenewQuery(sql, null, function (result) {
        if (!result) {
        } else {
            callback(result.rowsAffected);

        }
    });
};


var updateUser = (user_id, user, callback) => {
    var sql = "UPDATE users SET name = '" + user.name + "', email = '" + user.email + "', phone = '" + user.phone + "', sub_id = '" + user.sub_id + "' WHERE user_id = '" + user_id + "' ;";
    db.executenewQuery(sql, null, function (result) {
        if (!result) {
        } else {
            callback(result.rowsAffected);

        }
    });
};

var updatePassword = (password, id, callback) => {
    var sql = "UPDATE users SET password = '" + password + "' WHERE user_id = " + id + " ;";
    db.executenewQuery(sql, null, function (result) {
        if (!result) {
        } else {
            callback(result.rowsAffected);

        }
    });
};


var updateEmp = (id, emp, callback) => {
    var sql = "UPDATE users SET name = '" + emp.name + "', email = '" + emp.email + "', phone =  '" + emp.phone + "', address =  '" + emp.address + "', sub_id =  " + emp.sub + " WHERE user_id =" + id + " ;";
    db.executenewQuery(sql, null, function (result) {
        if (!result) {
        } else {
            callback(result.rowsAffected);

        }
    });
};

var deleteUser = (id, callback) => {
    var sql = "DELETE FROM users WHERE user_id = " + id + ";";
    db.executenewQuery(sql, null, function (result) {
        if (!result) {
        } else {
            callback(result.rowsAffected);

        }
    });
};
var validateUser = (email, password, callback) => {
    var sql = "SELECT [user_id],[name],[phone],[email],[is_admin],[password],[sub_id] FROM [dbo].[users] where [dbo].[users].email ='?' AND [dbo].[users].password ='?';";
    db.executenewQuery(sql, null, function (result) {

            if (!result) {
            } else {
                callback(result.recordset[0]);
            }

        

    });
};

var validateUser0 = (email, password, callback) => {
    var sql = "SELECT [user_id],[name],[phone],[email],[is_admin],[password],[sub_id] FROM [dbo].[users] where [dbo].[users].email ='" + email + "' AND [dbo].[users].password ='" + password + "';";
    db.executenewQuery(sql, null, function (result) {
        if (!result) {
        } else {
            callback(result.recordset[0]);
        }
    });
};


var getUser = (id, callback) => {
    var sql = "SELECT * FROM users WHERE user_id='" + id + "'";
    db.executenewQuery(sql, null, function (result) {
        if (!result) {
        } else {
            callback(result.recordset[0]);
        }
    });
};


var getAll = (callback) => {
    var sql = "SELECT * FROM users";
    db.executenewQuery(sql, null, function (result) {
        if (!result) {
        } else {
            callback(result.recordset);
        }
    });
};

var searchBy = (searchBy, word, callback) => {
    var sql = "SELECT * FROM users WHERE " + searchBy + " = '" + word + "'";
    db.executenewQuery(sql, [word], function (result) {
        if (!result) {
        } else {
            callback(result.recordset);
        }
    });
};


var getUserBorrow = (id, callback) => {
    var sql = "SELECT * FROM device WHERE sub_id = " + id + ";";
    db.executenewQuery(sql, null, function (result) {
        if (!result) {
        } else {
            callback(result.recordset);
        }
    });
};

var TotalVistorSubDevice = (id, callback) => {
    var sql = "SELECT COUNT(*) AS Number FROM device WHERE device.sub_id = " + id + ";";
    db.executenewQuery(sql, null, function (result) {
        if (!result) {
        } else {
            callback(result.recordset[0]);
        }
    });
};



module.exports = {
    TotalVistorSubDevice,
    validateUser,
    createUser,
    validateUser0,
    getUser,
    updateUser,
    updatePassword,
    getAll,
    searchBy,
    updateEmp,
    deleteUser,
    getUserBorrow
};
