const sql = require("mssql");

const config = {
    user: "sa",
    password: "123456789",
    server: "localhost",
    database: "it",
    options: {
        trustServerCertificate: true
    }
};

module.exports = {
    executenewQuery: function (sqls, sqlParam, callback) {
        try {
            sql.connect(config, err => {
                if (err) {
                 //   throw err;
                }
                try {
                    new sql.Request().query(sqls, (err, result) => {
                    //handle err
                //    console.log(result);
//                    console.log("recordset:"+result.recordset);

                    callback(result);
                });
        } catch (err) {
            // ... error checks
        }
               
            });
        } catch (err) {
            // ... error checks
        }
    }
};
