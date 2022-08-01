//declaration
var express = require('express');
var expressSession = require('express-session');
var bodyParser = require('body-parser');
const fs = require('fs');
const fileUpload = require('express-fileupload');
const path = require('path');

var app = express();
var port = 3000;

//common controllers

//configure
app.set('view engine', 'ejs');

//middlewares
app.use(bodyParser.urlencoded({extended: false}));
app.use(expressSession({secret: 'my top secret pass', resave: false, saveUninitialized: true}));
app.use('/css', express.static(__dirname + '/public/css'));
app.use('/js', express.static(__dirname + '/public/js'));
app.use('/img', express.static(__dirname + '/public/img'));
app.use('/jsv', express.static(__dirname + '/public/jsv'));
app.use('/icons', express.static(__dirname + '/public/icons'));

app.use('/images', express.static(__dirname + '/images'));
app.use(express.static(path.join(__dirname, '/public'))); // configure express to use public folder
app.use(bodyParser.json()); // parse form data client
app.use(fileUpload()); // configure fileupload

app.get('/admin', (req, res)=> {
            res.render('admin/index', {res: []});
});
app.get('/addcar', (req, res)=> {
            res.render('admin/add_car', {res: []});
});
app.get('/add_Custody', (req, res)=> {
            res.render('admin/add_Custody', {res: []});
});
app.get('/add_Expenses', (req, res)=> {
            res.render('admin/add_Expenses', {res: []});
});
app.get('/dash_allcompany', (req, res)=> {
            res.render('admin/dash_allcompany', {res: []});
});
app.get('/add_om', (req, res)=> {
            res.render('admin/add_om', {res: []});
});
app.get('/add_ompaid', (req, res)=> {
            res.render('admin/add_ompaid', {res: []});
});
app.get('/add_supplier', (req, res)=> {
            res.render('admin/add_supplier', {res: []});
});
app.get('/dashCars_table', (req, res)=> {
            res.render('admin/dashCars_table', {res: []});
});
app.get('/dashCustodys_table', (req, res)=> {
            res.render('admin/dashCustodys_table', {res: []});
});
app.get('/dashExpeneses_table', (req, res)=> {
            res.render('admin/dashExpeneses_table', {res: []});
});
app.get('/dashLins_table', (req, res)=> {
            res.render('admin/dashLins_table', {res: []});
});
app.get('/dash_Driverdetails_edit', (req, res)=> {
            res.render('admin/dash_Driverdetails_edit', {res: []});
});
app.get('/dash_addcompany', (req, res)=> {
            res.render('admin/dash_addcompany', {res: []});
});
app.get('/dash_addline', (req, res)=> {
            res.render('admin/dash_addline', {res: []});
});
app.get('/dash_addnewdriver', (req, res)=> {
            res.render('admin/dash_addnewdriver', {res: []});
});
app.get('/dash_allOperatingmovements', (req, res)=> {
            res.render('admin/dash_allOperatingmovements', {res: []});
});
app.get('/dash_allOperatingmovementsdetils', (req, res)=> {
            res.render('admin/dash_allOperatingmovementsdetils', {res: []});
});
app.get('/dash_allcompany', (req, res)=> {
            res.render('admin/dash_allcompany', {res: []});
});
app.get('/dash_editcompany', (req, res)=> {
            res.render('admin/dash_editcompany', {res: []});
            
});app.get('/dash_editline', (req, res)=> {
            res.render('admin/dash_editline', {res: []});
});
app.get('/dash_statistics', (req, res)=> {
            res.render('admin/dash_statistics', {res: []});
});
app.get('/dashdrivers_table', (req, res)=> {
            res.render('admin/dashdrivers_table', {res: []});
});
app.get('/dashsupplier_table', (req, res)=> {
            res.render('admin/dashsupplier_table', {res: []});
});
app.get('/404', (req, res)=> {
            res.render('404', {res: []});
});


//customer routes

//server start
app.listen(port, ()=>{
    console.log(`Server running on port ${port}`);
});
