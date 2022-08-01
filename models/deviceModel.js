var db = require.main.require('./models/config');

//--------------------------------------------------------INSERT


var CreateDevice = (device, date, callback) => {
    var sql = "INSERT INTO device(sub_id,creator_id, Type, description, model, sn, ip, date_entry) VALUES(" + device.sub_id + "," + device.creator_id + ",'" + device.Type + "','" + device.description + "','" + device.model + "','" + device.sn + "','" + device.ip + "','" + date + "' );";
    console.log(sql);
    db.executenewQuery(sql, null, function (result) {
        if (!result) {
        } else {
            callback(result.rowsAffected);
        }
    });
};

var complintRequest = (creator_id, device, callback) => {
    var sql = "INSERT INTO [dbo].[complaint_request] ([sub_id] ,[creator_id] ,[complaint_description] ,[numbertekit]  ,[device_barcode],[date])VALUES ( '" + device.sub_id + "',  '" + creator_id + "' ,'" + device.description + "', '" + device.numbertekit + "', '" + device.barcode + "' ,getdate());";
    console.log(sql);
    db.executenewQuery(sql, null, function (result) {
        if (!result) {
        } else {
            callback(result.rowsAffected);
        }
    });
};


var createopration = (barcode, opration, eng, notes, callback) => {
    var date = new Date();
    var sql = "INSERT INTO operations(device_barcode, operations_description, Start_date, Eng_id,notes) VALUES ( '" + barcode + "' , '" + opration + "' , getdate(), '" + eng + "','" + notes + "' )";
    console.log(sql);
    db.executenewQuery(sql, null, function (result) {
        if (!result) {
        } else {
            callback(result.rowsAffected);
        }
    });
};

var addoprationtemp = (opration, callback) => {
    var sql = "INSERT INTO [operations_temp]([operation])VALUES('" + opration + "')";

    db.executenewQuery(sql, null, function (result) {
        if (!result) {
        } else {
            callback(result.rowsAffected);
        }
    });
};



var adddevicetype = (type, callback) => {
    var sql = "INSERT INTO [dbo].[device_type] ([type])  VALUES('" + type + "')";
    db.executenewQuery(sql, null, function (result) {
        if (!result) {
        } else {
            callback(result.rowsAffected);
        }
    });
};

var addsubs = (id, sub, callback) => {
    var sql = "INSERT INTO [dbo].[subs] ([sub_id],[name]) VALUES('" + id + "','" + sub + "')";
    db.executenewQuery(sql, null, function (result) {
        if (!result) {
        } else {
            callback(result.rowsAffected);
        }
    });
};
var addtrns = (name, id, sub, notes, callback) => {
    var sql = "Insert into  [dbo].[tras] ([name_emp],[id_emp],[name_sub],[Start_date],[notes]) Output Inserted.barcode Values ('" + name + "','" + id + "','" + sub + "' ,getdate(),'" + notes + "') ;";
    console.log(sql);

    db.executenewQuery(sql, null, function (result) {
        callback(result.recordset[0]);
    });
};
var addtrnsdevise = (bard, bart, callback) => {
    var sql = "INSERT INTO [dbo].[tras_device] ([barcodetrans] ,[barcodedevice]) Values ('" + bart + "','" + bard + "') ;";
    console.log(sql);
    db.executenewQuery(sql, null, function (result) {
        if (!result) {
        } else {
            callback(result.rowsAffected);
        }
    });
};



//--------------------------------------------------------UPDATE


var updatereply = (barcode, reply, callback) => {
    var sql = "UPDATE device SET reply = '" + reply + "' WHERE device.barcode = '" + barcode + "'";
    db.executenewQuery(sql, null, function (result) {
        if (!result) {
        } else {
            callback(result.rowsAffected);
        }
    });
};

var endopration = (Operation_id, notes, eng, callback) => {
    var date = new Date();
    var sql = "UPDATE operations SET operations.end_date =getdate(), operations.end_note = '" + notes + "' , operations.Eng_id = '" + eng + "' WHERE operations.Operation_id = '" + Operation_id + "' ;";
    console.log(sql);

    db.executenewQuery(sql, null, function (result) {
        if (!result) {
        } else {
            callback(result.rowsAffected);
        }
    });
};

var UPDATE_complaint_request_status = (request_id, status, eng, callback) => {
    var sql = "UPDATE complaint_request SET complaint_request.request_status ='" + status + "' , complaint_request.Eng_id = '" + eng + "' WHERE complaint_request.request_id = '" + request_id + "' ;";
    db.executenewQuery(sql, null, function (result) {
        if (!result) {
        } else {
            callback(result.rowsAffected);
        }
    });
};

var updatestatusinit = (barcode, callback) => {
    var sql = "UPDATE device SET device_status = 'in it' WHERE device.barcode =  '" + barcode + "'";
    db.executenewQuery(sql, null, function (result) {
        if (!result) {
        } else {
            callback(result);
        }
    });
};
var updatestatusoutit = (barcode, callback) => {
    var sql = "UPDATE device SET device_status = 'out it' WHERE device.barcode = '" + barcode + "'";
    db.executenewQuery(sql, null, function (result) {
        if (!result) {
        } else {
            callback(result);
        }
    });
};

var updatestatusreplaced = (barcode, callback) => {
    var sql = "UPDATE device SET device_status = 'replaced' WHERE device.barcode = '" + barcode + "'";
    db.executenewQuery(sql, null, function (result) {
        if (!result) {
        } else {
            callback(result);
        }
    });
};

var updateBook = (id, device, callback) => {
    var sql = "UPDATE device SET sub_id = '" + device.sub_id + "', Type = '" + device.Type + "', description = '" + device.description + "', complainant = '" + device.complainant + "', phone = '" + device.phone + "', barcode = '" + device.barcode + "', sn = '" + device.sn + "' ,ip = '" + device.ip + "' WHERE device_id = '" + id + "'";
    db.executenewQuery(sql, null, function (result) {
        if (!result) {
        } else {
            callback(result);
        }
    });
};


//--------------------------------------------------------delete

var deleteBook = (id, callback) => {
    var sql = "DELETE FROM device WHERE device_id = '" + id + "'";
    db.executenewQuery(sql, null, function (result) {
        if (!result) {
        } else {
            callback(result);
        }
    });
};

var DELETE_complaint_request = (request_id, callback) => {
    var sql = "DELETE FROM complaint_request WHERE complaint_request.request_id = '" + request_id + "' ;";
    db.executenewQuery(sql, null, function (result) {
        if (!result) {
        } else {
            callback(result);
        }
    });
};

var DELETE_device = (barcode, callback) => {
    var sql = "DELETE FROM device WHERE device.barcode = '" + barcode + "' ;";
    db.executenewQuery(sql, null, function (result) {
        if (!result) {
        } else {
            callback(result);
        }
    });
};
var DELETE_operation = (Operation_id, callback) => {
    var sql = "DELETE FROM operations WHERE operations.Operation_id = '" + Operation_id + "' ;";
    db.executenewQuery(sql, null, function (result) {
        if (!result) {
        } else {
            callback(result);
        }
    });
};


//===========================================select


var gettransdevicetitel = (barcode, callback) => {
    var sql = "SELECT * FROM tras_device s JOIN device hp on s.barcodedevice = hp.barcode  JOIN tras h  on s.barcodetrans = h.barcode  where s.barcodetrans ='" + barcode + "' ;";
    console.log(sql);

    db.executenewQuery(sql, null, function (result) {
        console.log(result);

        if (!result) {
        } else {
            callback(result.recordset);
        }
    });

};


var gettransdevice = (barcode, callback) => {
    var sql = "SELECT * FROM tras_device s JOIN device hp on s.barcodedevice = hp.barcode  where s.barcodetrans ='" + barcode + "' ;";
    db.executenewQuery(sql, null, function (result) {
        if (!result) {
        } else {
            callback(result.recordset);
        }
    });

};
var getalltrans = (time, callback) => {
    var sql = "SELECT * FROM tras where CONVERT(datetime, Start_date) >= DATEADD(day,-" + time + ", getdate()) and CONVERT(datetime, Start_date) <= getdate();";
    db.executenewQuery(sql, null, function (result) {
        console.log(result);
        if (!result) {
        } else {
            callback(result.recordset);
        }
    });

};
var transsearchBy = (searchBy, word, callback) => {
    var sql = "SELECT * FROM tras WHERE " + searchBy + " = '" + word + "' ;";
    console.log(sql);

    db.executenewQuery(sql, null, function (result) {

        if (!result) {
        } else {
            callback(result.recordset);
        }

    });
};

var getAlloperationsti = (time, callback) => {
    var sql = "SELECT * FROM [operations] s JOIN device h on s.device_barcode = h.barcode  JOIN subs q  on h.sub_id = q.sub_id   where CONVERT(datetime, s.Start_date) >= DATEADD(day,-" + time + ", getdate()) and    CONVERT(datetime, s.Start_date) <= getdate(); ";
    db.executenewQuery(sql, null, function (result) {
        if (!result) {
        } else {
            callback(result.recordset);
        }
    });
};



var searchByAlloperations = (searchBy, word, callback) => {
    var sql = "SELECT * FROM [operations] s JOIN device h on s.device_barcode = h.barcode  JOIN subs q  on h.sub_id = q.sub_id   where  " + searchBy + " = '" + word + "' ;";
    db.executenewQuery(sql, null, function (result) {
        if (!result) {
        } else {
            callback(result.recordset);
        }
    });
};



var getAll = (time, callback) => {
    var sql = "SELECT * FROM device where CONVERT(datetime, DATE) >= DATEADD(day,-" + time + ", getdate()) and CONVERT(datetime, DATE) <= getdate();";
    db.executenewQuery(sql, null, function (result) {
        if (!result) {
        } else {
            callback(result.recordset);
        }
    });

};
var getAlldevicehadreq = (time, callback) => {
    var sql = "SELECT * FROM complaint_request s JOIN device hp on s.device_barcode = hp.barcode JOIN subs h  on hp.sub_id = h.sub_id where CONVERT(datetime, s.date) >= DATEADD(day,-" + time + ", getdate()) and    CONVERT(datetime, s.date) <= getdate(); ";
    db.executenewQuery(sql, null, function (result) {
        if (!result) {
        } else {
            callback(result.recordset);
        }
    });
};



var searchBy = (searchBy, word, callback) => {
    var sql = "SELECT * FROM device WHERE " + searchBy + " = '" + word + "' ;";
    db.executenewQuery(sql, null, function (result) {
        if (!result) {
        } else {
            callback(result.recordset);
        }
    });
};


var dreqsearchBy = (searchBy, word, callback) => {
    var sql = "SELECT * FROM complaint_request s JOIN device hp on s.device_barcode = hp.barcode JOIN subs h  on hp.sub_id = h.sub_id where " + searchBy + " = '" + word + "' ;";
    db.executenewQuery(sql, null, function (result) {
        if (!result) {
        } else {
            callback(result.recordset);
        }
    });
};

var getlastbarcode = (device, date, callback) => {
    var sql = "SELECT barcode FROM device WHERE sub_id =" + device.sub_id + " AND ip ='" + device.ip + "' AND date_entry LIKE '%" + date + "%' ;";
    db.executenewQuery(sql, null, function (result) {
        callback(result.recordset[0]);
    });
};

var getDevice = (barcode, callback) => {
    var sql = "SELECT * FROM device WHERE barcode='" + barcode + "'";
    db.executenewQuery(sql, null, function (result) {
        callback(result.recordset[0]);
    });
};
var getDeviceHistoryComplint = (barcode, callback) => {
    var sql = "SELECT * FROM complaint_request WHERE device_barcode ='" + barcode + "'";
    db.executenewQuery(sql, null, function (result) {
        if (!result) {
        } else {
            callback(result.recordset);
        }
    });
};
var getDeviceHistoryOpration = (barcode, callback) => {
    var sql = "SELECT * FROM operations WHERE device_barcode = '" + barcode + "'";
    db.executenewQuery(sql, null, function (result) {
        if (!result) {
        } else {
            callback(result.recordset);
        }
    });
};

var getBook = (id, callback) => {
    var sql = "SELECT * FROM device WHERE device_id='" + id + "'";
    db.executenewQuery(sql, null, function (result) {
        callback(result.recordset[0]);
    });
};

var getvistordevise = (vistorsubid, callback) => {
    var sql = "SELECT * FROM device WHERE sub_id = " + vistorsubid + "";
    db.executenewQuery(sql, null, function (result) {
        if (!result) {
        } else {
            callback(result.recordset);
        }
    });
};

var getRequestedBooks = (callback) => {
    var sql = "SELECT * FROM complaint_request";
    db.executenewQuery(sql, null, function (result) {
        if (!result) {
        } else {
            callback(result.recordset);
        }
    });
};

var deviceRequestSearch = (searchBy, word, callback) => {
    var sql = "SELECT * FROM complaint_request WHERE " + searchBy + " = '" + word + "'";
    db.executenewQuery(sql, null, function (result) {
        if (!result) {
        } else {
            callback(result.recordset);
        }
    });
};


var devicesIssuedByCustomer = (customer_id, callback) => {
    var sql = "SELECT * FROM device WHERE sub_id = '" + customer_id + "'";
    db.executenewQuery(sql, null, function (result) {
        if (!result) {
        } else {
            callback(result);
        }
    });
};
var getsubrequst = (sub_id, callback) => {
    var sql = "SELECT * FROM complaint_request WHERE sub_id = '" + sub_id + "'";
    db.executenewQuery(sql, null, function (result) {
        if (!result) {
        } else {
            callback(result.recordset);
        }
    });
};


var totalrequested30 = (callback) => {
    var result = new Date();
    var newDate = result.setDate(result.getDate() + 30);
    var sql = "SELECT * FROM complaint_request WHERE (complaint_request.date BETWEEN '" + newDate + "' AND '" + result + "')";
    db.executenewQuery(sql, null, function (result) {
        if (!result) {
        } else {
            callback(result.recordset);
        }
    });
};

var getAllDeviceType = (callback) => {
    var sql = "SELECT * FROM device_type";
    db.executenewQuery(sql, null, function (result) {
        if (!result) {
        } else {
            callback(result.recordset);
        }
    });
};

var getAllSubs = (callback) => {
    var sql = "SELECT * FROM subs";
    db.executenewQuery(sql, null, function (result) {
        if (!result) {
        } else {
            callback(result.recordset);
        }
    });
};
var getAllStetus = (callback) => {
    var sql = "SELECT * FROM status";
    db.executenewQuery(sql, null, function (result) {
        if (!result) {
        } else {
            callback(result.recordset);
        }
    });
};

var getAlloperations = (callback) => {
    var sql = "SELECT * FROM operations_temp";
    db.executenewQuery(sql, null, function (result) {
        if (!result) {
        } else {
            callback(result.recordset);
        }
    });
};

var getSubDevice = (Sub_id, callback) => {
    var sql = "SELECT * FROM device WHERE device.sub_id = '" + Sub_id + "';";
    db.executenewQuery(sql, null, function (result) {
        if (!result) {
        } else {
            callback(result.recordset);
        }
    });
};

// SELECT devices.*, issue_date.device_id, COUNT(*) AS magnitude FROM issue_date INNER JOIN devices ON issue_date.device_id=devices.device_id WHERE (date BETWEEN '2018-07-10' AND '2018-08-10') GROUP BY devices.isbn ORDER BY magnitude DESC LIMIT 1


module.exports = {
    getAlloperations,
    DELETE_operation,
    DELETE_device,
    DELETE_complaint_request,
    UPDATE_complaint_request_status,
    endopration,
    createopration,
    updatestatusinit,
    updatestatusoutit,
    updatestatusreplaced,
    updatereply,
    getDeviceHistoryComplint,
    getDeviceHistoryOpration,
    complintRequest,
    getDevice,
    dreqsearchBy,
    getAlldevicehadreq,
    getSubDevice,
    getAllSubs,
    getAllStetus,
    getAllDeviceType,
    getAll,
    searchBy,
    getBook,
    updateBook,
    deleteBook,
    getvistordevise,
    CreateDevice,
    getlastbarcode,
    getRequestedBooks,
    deviceRequestSearch,
    getsubrequst,
    devicesIssuedByCustomer,
    totalrequested30,
    addoprationtemp,
    addsubs,
    adddevicetype,
    addtrns,
    gettransdevice,
    addtrnsdevise,
    gettransdevicetitel,
    getalltrans,
    transsearchBy,
    getAlloperationsti,
    searchByAlloperations
};
