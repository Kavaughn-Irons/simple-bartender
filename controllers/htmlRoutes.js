const express = require("express");
const path = require("path");
const orm = require("../config/orm");
const bodyParser = require("body-parser")
var urlencodedParser = bodyParser.urlencoded({extended: false});

const router = express.Router();

router.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "../public/Html/home-page.html"));
});
router.get("/home-page-javascript", function(req, res) {
  res.sendFile(path.join(__dirname, "../public/Javascript/home-page.js"));
});
router.get("/home-page-stylesheet", function(req, res) {
  res.sendFile(path.join(__dirname, "../public/Stylesheets/home-page.css"));
});
router.get("/background-image", function(req, res) {
  res.sendFile(path.join(__dirname, "../public/Html/Assets/home-page-image.jpg"));
});
//----------------------------------------------------------------------------------
router.get("/customer-home-page-html", function(req, res) {
  res.sendFile(path.join(__dirname, "../public/Html/login-customer/index.html"));
});
router.get("/customer-home-page-stylesheet", function(req, res) {
  res.sendFile(path.join(__dirname, "../public/Html/login-customer/css/style.css"));
});
router.get("/customer-home-page-javascript", function(req, res) {
  res.sendFile(path.join(__dirname, "../public/Html/login-customer/js/main.js"));
});
//-----------------------------------------------------------------------------------
router.get("/manager-home-page-html", function(req, res) {
  res.sendFile(path.join(__dirname, "../public/Html/login-manager/index.html"));
});
router.get("/manager-home-page-stylesheet", function(req, res) {
  res.sendFile(path.join(__dirname, "../public/Html/login-manager/css/style.css"));
});
router.get("/manager-home-page-javascript", function(req, res) {
  res.sendFile(path.join(__dirname, "../public/Html/login-manager/js/main.js"));
});
//-----------------------------------------------------------------------------------
router.get("/manager-signup-signin", function(req, res) {
  res.sendFile(path.join(__dirname, "../public/Javascript/manager-signup-signin"));
});
//-----------------------------------------------------------------------------------
router.get("/api/get-manager-accounts", function(req, res) {
    orm.managerAccounts(res);    
});
router.get("/api/get-beverages", function(req, res) {
    orm.getBeverages(res);    
});

router.post("/api/sign-in",urlencodedParser,function(req,res){
var outerReq = req;
orm.authenticateManagerAccount(res,req.body["userinfo[]"]);

router.get("/api/sign-in/"+req.body.url, function(req, res) {

res.sendFile(path.join(__dirname, "../public/Html/login-manager-profile/profile-page.html"));

});

router.get("/api/sign-in/"+req.body.url+"/userinfo", function(req, res) {

res.send(outerReq.body["userinfo[]"]);

});

router.get("/manager-profile-page-stylesheet", function(req, res) {

res.sendFile(path.join(__dirname, "../public/Html/login-manager-profile/css/style2.css"));

});
    
router.get("/manager-profile-page-javascript", function(req, res) {

res.sendFile(path.join(__dirname, "../public/Html/login-manager-profile/js/main.js"));

});

    
});

router.post("/api/manager",urlencodedParser,function(req,res){
    console.log(req.body["params[]"]);
    orm.createManagerAccount(req.body["params[]"]);
});

router.post("/api/new-beverage",urlencodedParser,function(req,res){
    console.log(req.body["params[]"]);
    orm.createBeverage(req.body["params[]"]);
});

router.post("/api/delete-beverage",urlencodedParser,function(req,res){
  console.log(req.body);
  orm.deleteBeverage(req.body["params[]"]);
    
});

router.post("/api/order-beverage",urlencodedParser,function(req,res){
  console.log(req.body["params[]"]);
  orm.orderBeverage(req.body["params[]"]);
});

router.get("/api/get-orders",urlencodedParser,function(req,res){
  orm.getOrders(res);
});

router.post("/api/cash-out",urlencodedParser,function(req,res){
    console.log(req.body);
    orm.cashOut(req.body,req.body.length);
});
//------------------------------------------------------------------------------------
router.post("/api/customer",urlencodedParser,function(req,res){
    console.log(req.body["params"]);
    orm.createCustomerAccount(req.body["params[]"]);
});

router.get("/api/get-customer-accounts", function(req, res) {
    orm.customerAccounts(res);    
});

router.post("/api/customer-sign-in",urlencodedParser,function(req,res){

    var outerReq = req;
    orm.authenticateCustomerAccount(res,req.body["userinfo[]"]);

    router.get("/api/customer-sign-in/"+req.body.url, function(req, res) {
    res.sendFile(path.join(__dirname, "../public/Html/login-customer-profile/profile-page.html"));
    });
    router.get("/api/customer-sign-in/"+req.body.url+"/userinfo", function(req, res) {
    res.send(outerReq.body["userinfo[]"]);
    });
    router.get("/customer-profile-page-stylesheet", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/Html/login-customer-profile/css/style2.css"));
    });
    router.get("/customer-profile-page-javascript", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/Html/login-customer-profile/js/main.js"));
    });

});
//------------------------------------------------------------------------------------
module.exports = router;
