var express = require('express');
var router = express.Router();
var userModel = require.main.require('./models/userModel');
var deviceModel = require.main.require('./models/deviceModel');
var validationRules = require.main.require('./validation_rules/rules');
var asyncValidator = require('async-validator-2');
const fs = require('fs');




router.get('/home', (req, res) => {
    // var users = "";
    userModel.getAll((users) => {
        if (!users) {
            res.send("Invalid");
        } else {
            deviceModel.getAll(4,(devices) => {
                if (!devices) {
                    res.send("Invalid");
                } else {
                    deviceModel.getRequestedBooks((borrowed) => {
                        if (!borrowed) {
                            res.send("invalid");
                        } else {
                            res.render('admin/home', {usr: users.length, bk: devices.length, brwd: borrowed.length, mb: " mostBorrowed.length", mrb: '34', mbb: '34'});

                        }
                    });
                }
            });
        }
    });
});

router.get('/profile', (req, res) => {
    var admin = userModel.getUser(req.session.admin, (result) => {
        if (!result) {
            res.send("invalid!");
        } else {
            console.log(result);
            res.render('admin/profile', {res: result});
        }
    });
});

router.get('/profile/edit', (req, res) => {
    var admin = userModel.getUser(req.session.admin, (result) => {
        if (!result) {
            res.send("invalid");
        } else {
            console.log(result);
            res.render('admin/profile-edit', {res: result, errs: []});
        }
    });
});

router.post('/profile/edit', (req, res) => {
    var rules = validationRules.users.update;
    var validator = new asyncValidator(rules);
    var data = {
        user_id: req.body.user_id,
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        sub_id: req.session.sub_id
    };

    validator.validate(data, (errors, fields) => {
        if (!errors) {
            userModel.updateUser(data, (result) => {
                if (!result) {
                    res.send('invalid');
                } else {
                    res.redirect('/admin/profile');
                }
            });
        } else {
            console.log(fields);
            res.render('admin/profile-edit', {errs: errors, res: []});
        }
    });
});

router.get('/changepass', (req, res) => {
    var admin = userModel.getUser(req.session.admin, (result) => {
        if (!result) {
            res.send("invalid!");
        } else {
            console.log(result);
            res.render('admin/change-password', {res: result, errs: [], success: []});
        }
    });
});

router.post('/changepass', (req, res) => {
    var rules = validationRules.users.changePassword;
    var validator = new asyncValidator(rules);
    var data = {
        oldPassword: req.body.oldPassword,
        newPassword: req.body.newPassword,
        confirmPassword: req.body.confirmPassword
    };

    if (req.body.password == req.body.oldPassword) {
        validator.validate(data, (errors, fields) => {
            if (!errors) {
                if (req.body.newPassword == req.body.confirmPassword) {
                    userModel.updatePassword(req.body.newPassword, req.body.user_id, (result) => {
                        if (!result) {
                            res.send('invalid');
                        } else {
                            res.render('admin/change-password', {errs: [], res: [], success: [{message: "Password changed successfully"}]});
                        }
                    });
                } else {
                    res.render('admin/change-password', {errs: [{message: "Your new passwords don't match!"}], res: [], success: []});
                }
            } else {
                console.log(fields);
                res.render('admin/change-password', {errs: errors, res: [], success: []});
            }
        });
    } else {
        res.render('admin/change-password', {errs: [{message: "Your old passsword does not match!"}], res: [], success: []});
    }

});

router.get('/users', (req, res) => {
    userModel.getAll((result) => {
        if (!result) {
            res.send("Invalid");
        } else {
            console.log(result);
            res.render('admin/users', {res: result, errs: []});
        }
    });
});

router.post('/users', (req, res) => {
    var searchBy = req.body.searchBy;
    var word = req.body.word;
    userModel.searchBy(searchBy, word, (result) => {
        if (!result) {
            res.render('admin/users', {res: [], errs: [{message: "No results found!"}]});
        } else {
            console.log(result);
            res.render('admin/users', {res: result, errs: []})
        }
    });
});

router.get('/users/add', (req, res) => {
    deviceModel.getAllSubs((result1) => {
        if (!result1) {
            res.send("Invalid");
        } else {
            console.log(result1);
            res.render('admin/users-add', {subs: result1, errs: [], success: [], data: []});

        }
    });
});

router.post('/users/add', (req, res) => {
    var data = {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        password: req.body.password,
        sub_id: req.body.sub_id
    };
    var id = req.body.id;

    var rules = validationRules.users.create;
    var validator = new asyncValidator(rules);

    validator.validate(data, (errors, fields) => {
        if (!errors) {
            userModel.createUser(id, data, (result) => {
                if (!result) {
                    res.send("Invalid");
                } else {
                    console.log(result);
                    deviceModel.getAllSubs((result1) => {
                        if (!result1) {
                            res.send("Invalid");
                        } else {
                            console.log(result1);
                            res.render('admin/users-add', {subs: result1, errs: [], success: [{message: "user added successfully!"}], data: []});


                        }
                    });
                }
            });
        } else {
            console.log(fields);
            deviceModel.getAllSubs((result1) => {
                if (!result1) {
                    res.send("Invalid");
                } else {
                    console.log(result1);
                    res.render('admin/users-add', {subs: result1, errs: errors, success: [], data});



                }
            });
        }
    });
});


router.get('/users/edit/:id', (req, res) => {
    var customer = req.params.id;
    userModel.getUser(customer, (result) => {
        if (result.length == 0) {
            res.send("Invalid");
        } else {

            deviceModel.getAllSubs((result1) => {
                if (!result1) {
                    res.send("Invalid");
                } else {
                    console.log(result1);

                    res.render('admin/users-edit', {subs: result1, res: result, errs: [], success: []});


                }
            });

        }
    });
});

router.post('/users/edit/:id', (req, res) => {
    var data = {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        password: req.body.password,
        sub_id: req.body.sub_id
    };
    var user_id = req.body.user_id;

    var rules = validationRules.users.create;
    var validator = new asyncValidator(rules);

    validator.validate(data, (errors, fields) => {
        if (!errors) {
            userModel.updateUser(user_id, data, (result) => {
                if (!result) {
                    res.send("Invalid");
                } else {
                    console.log(result);


                    deviceModel.getAllSubs((result1) => {
                        if (!result1) {
                            res.send("Invalid");
                        } else {
                            console.log(result1);
                            res.render('admin/users-edit', {subs: result1, res: result, errs: [], success: [{message: "user updated successfully!"}]});



                        }
                    });








                }
            });
        } else {
            console.log(fields);






            deviceModel.getAllSubs((result1) => {
                if (!result1) {
                    res.send("Invalid");
                } else {
                    console.log(result1);
                    res.render('admin/users-edit', {subs: result1, res: data, errs: errors, success: []});



                }
            });

        }
    });

});

router.get('/users/profile/:id', (req, res) => {
    var id = req.params.id;
    var customer = userModel.getUser(id, (result) => {
        if (result.length == 0) {
            res.send("Invalid");
        } else {
            console.log(result);

            deviceModel.getAllSubs((result1) => {
                if (!result1) {
                    res.send("Invalid");
                } else {
                    console.log(result1);

                    res.render('admin/users-profile', {subs: result1, res: result, errs: [], success: []});


                }
            });


        }
    });
});

router.get('/users/delete/:id', (req, res) => {
    var id = req.params.id;
    var customer = userModel.getUser(id, (result) => {
        if (result.length == 0) {
            res.send("Invalid");
        } else {
            console.log(result);
            deviceModel.getAllSubs((result1) => {
                if (!result1) {
                    res.send("Invalid");
                } else {
                    console.log(result1);

                    res.render('admin/users-delete', {subs: result1, res: result, errs: [], success: []});


                }
            });
        }
    });
});

router.post('/users/delete/:id', (req, res) => {
    var id = req.body.user_id;
    var user = userModel.deleteUser(id, (result) => {
        if (result.length == 0) {
            res.send("Invalid");
        } else {
            console.log(result);
            res.redirect('/admin/users');
        }
    });
});
//--------------------admin dev

router.get('/device/delete/:barcode', (req, res) => {
    var barcode = req.params.barcode;
    var device = deviceModel.DELETE_device(barcode, (result) => {
        if (result.length == 0) {
            res.send("Invalid");
        } else {
            console.log(result);
            res.send("deleted");
        }
    });
});
router.get('/operation/delete/:barcode', (req, res) => {
    var barcode = req.params.barcode;
    var device = deviceModel.DELETE_operation(barcode, (result) => {
        if (result.length == 0) {
            res.send("Invalid");
        } else {
            console.log(result);
            res.redirect('back');
        }
    });
});

router.get('/complaint/delete/:barcode', (req, res) => {
    var barcode = req.params.barcode;
    var device = deviceModel.DELETE_complaint_request(barcode, (result) => {
        if (result.length == 0) {
            res.send("Invalid");
        } else {
            console.log(result);
            res.redirect('back');
        }
    });
});



//------------------------------------------------------------------------------

router.get('/devices', (req, res) => {
    deviceModel.getAll(7,(result) => {
        if (!result) {
            res.send("Invalid");
        } else {
            console.log(result);
            res.render('admin/alldevices', {res: result,gt:1, errs: []});
        }
    });
});

router.post('/devices', (req, res) => {
    var searchBy = req.body.searchBy;
    var word = req.body.word;
    var gettime = req.body.gettime;

    if (searchBy !=0&&word !=""){ 
        deviceModel.searchBy(searchBy, word, (result) => {
        if (!result) {
            res.render('admin/alldevices', {res: [], errs: [{message: "No results found!"}]});
        } else {
            console.log(result);
            res.render('admin/alldevices', {res: result,gt:1, errs: []});
        }
    });     
    }else{
        var time =7;
        if (gettime == 1){ time =7 ;}
        else   if (gettime == 2){ time =30 ;}
        else   if (gettime == 3){ time =90 ;}
        else   if (gettime == 4){ time =120 ;}

            deviceModel.getAll(time,(result) => {
        if (!result) {
            res.send("Invalid");
        } else {
            console.log(result);
            res.render('admin/alldevices', {res: result,gt:gettime, errs: []});
        }
    });
        
    }
});


router.get('/devicehadreq', (req, res) => {
    deviceModel.getAlldevicehadreq(7,(result) => {
        if (!result) {
            res.send("Invalid");
        } else {
            console.log(result);
            res.render('admin/alldeviceshadrequst', {gt:1,res: result});
        }
    });
});


router.post('/devicehadreq', (req, res) => {
    var searchBy = req.body.searchBy;
    var word = req.body.word;
    var gettime = req.body.gettime;

    if (searchBy !=0&&word !=""){ 
    deviceModel.dreqsearchBy(searchBy, word, (result) => {
        if (!result) {
            res.render('admin/alldeviceshadrequst', {gt:1,res: [], errs: [{message: "No results found!"}]});
        } else {
            console.log(result);
            res.render('admin/alldeviceshadrequst', {gt:1,res: result, errs: []});
        }
    });   
    }else{
        var time =7;
        if (gettime == 1){ time =7 ;}
        else   if (gettime == 2){ time =30 ;}
        else   if (gettime == 3){ time =90 ;}
        else   if (gettime == 4){ time =120 ;}

        deviceModel.getAlldevicehadreq(time,(result) => {
        if (!result) {
            res.send("Invalid");
        } else {
            console.log(result);
            res.render('admin/alldeviceshadrequst', {res: result,gt:gettime, errs: []});
        }
    });   
    }
});






router.get('/complaint-request', (req, res) => {
    deviceModel.getAllSubs((result1) => {
        if (!result1) {
            res.send("Invalid");
        } else {
            console.log(result1);

            res.render('admin/complaint-request', {subs: result1, errs: [], success: []});


        }
    });

});

router.post('/complaint-request', (req, res) => {
    var data = {
        sub_id: req.body.sub_id,
        creator_id: req.session.admin,
        numbertekit: req.body.numtik,
        description: req.body.complaint_description,
        barcode: req.body.barcode
    };

    var rules = validationRules.device.complaint_request;
    var validator = new asyncValidator(rules);

    validator.validate(data, (errors, fields) => {
        if (!errors) {
            deviceModel.complintRequest(req.session.admin, data, (result) => {
                if (result.length == 0) {
                    res.send("Invalid");
                } else {

                    deviceModel.getAllSubs((result1) => {
                        if (!result1) {
                            res.send("Invalid");
                        } else {
                            console.log(result1);

                            res.render('admin/complaint-request', {subs: result1, errs: [], success: [{message: "Your request has been noted, thank you!"}]});


                        }
                    });

                }
            });
        } else {
            console.log(fields);
            deviceModel.getAllSubs((result1) => {
                if (!result1) {
                    res.send("Invalid");
                } else {
                    console.log(result1);
                    res.render('admin/complaint-request', {subs: result1, errs: [{message: "something worng"}], success: []});
                }
            });
        }
    });
});



router.get('/device/add', (req, res) => {

    deviceModel.getAllSubs((result1) => {
        if (!result1) {
            res.send("Invalid");
        } else {
            console.log(result1);

            deviceModel.getAllDeviceType((result2) => {
                if (!result1) {
                    res.send("Invalid");
                } else {
                    console.log(result2);

                    res.render('admin/device-add', {subs: result1, types: result2, errs: [], success: [], data: []});


                }
            });

        }
    });

});

router.post('/device/add', (req, res) => {
    var date = new Date();
    req.session.date_entry = date;

    var data = {
        sub_id: req.body.sub_id,
        creator_id: req.session.admin,
        Type: req.body.Type,
        description: req.body.description,
        model: req.body.model,
        sn: req.body.sn,
        ip: req.body.ip
    };

    var rules = validationRules.device.create;
    var validator = new asyncValidator(rules);

    validator.validate(data, (errors, fields) => {
        if (!errors) {
            deviceModel.CreateDevice(data, date, (result) => {
                if (!result) {
                    res.send("Invalid");
                } else {
                    console.log(result);
                    //  res.render('vistor/device-add', {errs: [], success: [{message: "Book added successfully!"}], data: []});
                    deviceModel.getlastbarcode(data, date, (result) => {
                        console.log(result);

                        if (!result) {
                            res.send("Invalid");
                        } else {
                            console.log(result[0]);
                            res.render('code/asd', {errs: [], success: [{message: "Device added successfully!"}], data: result, objnum: "''"});
                        }
                    });


                }
            });
        } else {
            console.log(fields + "ssssssss");



            res.redirect('back');
        }
    });
});


router.get('/deviceview/:barcode', (req, res) => {



    try {

        var barcode = req.params.barcode;
        deviceModel.getDevice(barcode, (result1) => {
            if (!result1) {
                res.send("Invalid");
            } else {
                deviceModel.getDeviceHistoryComplint(barcode, (result2) => {
                    if (!result2) {
                        res.send("Invalid");
                    } else {
                        deviceModel.getDeviceHistoryOpration(barcode, (result3) => {
                            if (!result3) {
                                res.send("Invalid");
                            } else {
                                res.render('admin/device-edit', {barcode: barcode, device: result1, Complints: result2, Oprations: result3, errs: [], success: []});
                            }
                        });
                    }
                });
            }
        });
    } catch (e) {
        console.log("entering catch block");

    }
});


router.post('/deviceview/:barcode', (req, res) => {
    var reply = req.body.enterreply;
    var barcode = req.params.barcode;
    deviceModel.updatereply(barcode, reply, (result) => {
        if (!result) {
            res.send("Invalid");
        } else {
            console.log(result);
            res.redirect('back');
        }
    });
});
router.get('/printbarcode/:barcode', (req, res) => {
    var barcode = req.params.barcode;
    res.render('code/embasd', {errs: [], success: [{message: " added successfully!"}], data: barcode, objnum: "''"});

});
router.get('/deviceinmain/:barcode', (req, res) => {

    var barcode = req.params.barcode;
    deviceModel.updatestatusinit(barcode, (result) => {
        if (!result) {
            res.send("Invalid");
        } else {
            console.log(result);
            res.redirect('back');
        }
    });
});
router.get('/deviceoutmain/:barcode', (req, res) => {
    var barcode = req.params.barcode;
    deviceModel.updatestatusoutit(barcode, (result) => {
        if (!result) {
            res.send("Invalid");
        } else {
            console.log(result);
            res.redirect('back');
        }
    });
});
router.get('/devicereplaced/:barcode', (req, res) => {

    var barcode = req.params.barcode;
    deviceModel.updatestatusreplaced(barcode, (result) => {
        if (!result) {
            res.send("Invalid");
        } else {
            console.log(result);
            res.redirect('back');
        }
    });
});



router.get('/createopration/:barcode', (req, res) => {
    var barcode = req.params.barcode;

    var admin = deviceModel.getAlloperations((result) => {
        if (!result) {
            res.send("invalid");
        } else {
            console.log(result);
            res.render('admin/oprationcaretor', {barcode: barcode, oprations: result, errs: [], success: []});
        }
    });

});
router.post('/createopration/:barcode', (req, res) => {
    var barcode = req.params.barcode;
    var opration = req.body.opration;
        var note = req.body.note;

    var admin = deviceModel.createopration(barcode, opration, req.session.admin,note, (result) => {
        if (!result) {
            res.send("invalid");
        } else {
            console.log(result);

            var admin1 = deviceModel.getAlloperations((result1) => {
                if (!result1) {
                    res.send("invalid");
                } else {
                    console.log(result1);
                    res.render('admin/oprationcaretor', {barcode: barcode, oprations: result1, errs: [], success: [{message: "opration start successfully!"}]});

                }
            });
        }
    });
});
router.get('/endopration/:barcode', (req, res) => {
    var barcode = req.params.barcode;
    res.render('admin/endopration', {barcode: barcode, errs: [], success: []});
});
router.post('/endopration/:barcode', (req, res) => {
    var barcode = req.params.barcode;
    var note = req.body.note;
    var admin = deviceModel.endopration(barcode, note, req.session.admin, (result) => {
        if (!result) {
            res.send("invalid");
        } else {
            console.log(result);
            res.render('admin/endopration', {barcode: barcode, errs: [], success: [{message: "opration end  successfully!"}]});
        }
    });
});

router.get('/request_status/:status/rid/:rid', (req, res) => {
    var status = req.params.status;
    var rid = req.params.rid;
    var admin = deviceModel.UPDATE_complaint_request_status(rid, status, req.session.admin, (result) => {
        if (!result) {
            res.send("invalid");
        } else {
            console.log(result);
            res.redirect('back');
        }
    });
});












router.get('/addoprationtmp', (req, res) => {
    res.render('admin/addoprationtemp', {errs: [], success: []});
});
router.post('/addoprationtmp', (req, res) => {
        var opration = req.body.opration;

      var rules = validationRules.input.insave;
    var validator = new asyncValidator(rules);
    var data = {
        text: opration
    };

    validator.validate(data, (errors, fields) => {
        if (!errors) {
    var admin = deviceModel.addoprationtemp(opration, (result) => {
        if (!result) {
            res.send("invalid");
        } else {
            console.log(result);
            res.render('admin/addoprationtemp', {errs: [], success: [{message: "opration end  successfully!"}]});
        }
    });
        } else {
            console.log(fields);
        }
    });
    
    
    
    
    
    
    
    
    

});

router.get('/adddevicetype', (req, res) => {
    res.render('admin/adddevicetype', {errs: [], success: []});
});
router.post('/adddevicetype', (req, res) => {
    var type = req.body.type;
    var admin = deviceModel.adddevicetype(type, (result) => {
        if (!result) {
            res.send("invalid");
        } else {
            console.log(result);
            res.render('admin/adddevicetype', {errs: [], success: [{message: " successfully!"}]});
        }
    });
});

router.get('/addsubs', (req, res) => {
    res.render('admin/addsubs', {errs: [], success: []});
});

router.post('/addsubs', (req, res) => {
    var sub_id = req.body.sub_id;
        var name = req.body.name;

    var admin = deviceModel.addsubs(sub_id,name, (result) => {
        if (!result) {
            res.send("invalid");
        } else {
            console.log(result);
            res.render('admin/addsubs', {errs: [], success: [{message: " successfully!"}]});
        }
    });
});

router.get('/getalltrans/', (req, res) => {

    deviceModel.getalltrans(7,(result) => {
        if (!result) {
            res.send("Invalid");
        } else {
            console.log(result);
            res.render('admin/alltras', {gt:1 ,res:result,errs: [], success: [{message: " successfully!"}]});
        }
    });
});


router.post('/getalltrans/', (req, res) => {
    var searchBy = req.body.searchBy;
    var word = req.body.word;
    var gettime = req.body.gettime;

    if (searchBy !=0&&word !=""){ 
        
      var rules = validationRules.search.input;
    var validator = new asyncValidator(rules);
    var data = {
        text: word
    };
      validator.validate(data, (errors, fields) => {
        if (!errors) {
deviceModel.transsearchBy(searchBy, word, (result) => {
        if (!result) {
            res.render('admin/alltras', {gt:1,res: [], errs: [{message: "No results found!"}]});
        } else {
            console.log(result);
            res.render('admin/alltras', {gt:1,res: result, errs: []});
        }
    });  
        } else {
            console.log(fields);
        }
    });
    
    
    
    
    }else{
        var time =7;
        if (gettime == 1){ time =7 ;}
        else   if (gettime == 2){ time =30 ;}
        else   if (gettime == 3){ time =90 ;}
        else   if (gettime == 4){ time =120 ;}

        deviceModel.getalltrans(time,(result) => {
        if (!result) {
            res.send("Invalid");
        } else {
            console.log(result);
            res.render('admin/alltras', {res: result,gt:gettime, errs: []});
        }
    });   
    }
});



router.get('/transview/:barcode', (req, res) => {
   var barcode = req.params.barcode;
    deviceModel.gettransdevicetitel(barcode,(result1) => {
        if (!result1) {
            res.send("Invalid");
        } else {
            res.render('sheet/sheet', {res: result1,bar:barcode,name:result1[0].name_emp,sub:result1[0].name_sub,id:result1[0].id_emp ,Start_date:result1[0].Start_date, errs: [], success: [], data: []});

        }
    });

});






router.get('/getAlloperations/', (req, res) => {

    deviceModel.getAlloperationsti(7,(result) => {
        if (!result) {
            res.send("Invalid");
        } else {
            console.log(result);
            res.render('admin/Alloperations', {gt:1 ,res:result,errs: [], success: [{message: " successfully!"}]});
        }
    });
});


router.post('/getAlloperations/', (req, res) => {
    var searchBy = req.body.searchBy;
    var word = req.body.word;
    var gettime = req.body.gettime;

    if (searchBy !=0&&word !=""){ 
    deviceModel.searchByAlloperations(searchBy, word, (result) => {
        if (!result) {
            res.render('admin/Alloperations', {gt:1,res: [], errs: [{message: "No results found!"}]});
        } else {
            console.log(result);
            res.render('admin/Alloperations', {gt:1,res: result, errs: []});
        }
    });   
    }else{
        var time =7;
        if (gettime == 1){ time =7 ;}
        else   if (gettime == 2){ time =30 ;}
        else   if (gettime == 3){ time =90 ;}
        else   if (gettime == 4){ time =120 ;}

        deviceModel.getAlloperationsti(time,(result) => {
        if (!result) {
            res.send("Invalid");
        } else {
            console.log(result);
            res.render('admin/Alloperations', {res: result,gt:gettime, errs: []});
        }
    });   
    }
});











module.exports = router;
