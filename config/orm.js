var connection = require("./connection");

// Object Relational Mapper (ORM)

// The ?? signs are for swapping out table or column names
// The ? signs are for swapping out other values
// These help avoid SQL injection
// https://en.wikipedia.org/wiki/SQL_injection





var orm = {

deleteBeverage:function(beverageData){

connection.query("DELETE FROM beverages WHERE beverageLocation = (?) AND beverageName = (?);",beverageData,function(err, result) {

console.log(err,"HERE!");   

});
},

createBeverage:function(dataArray){
 
var params = "(beverageName,beverageCost,beverageLocation)"    
        
connection.query("INSERT INTO beverages " + params + " VALUES (?,?,?)",dataArray,function(err, result) {

console.log(err,"HERE!");   

});
},   

getBeverages : function(res){
   
        
connection.query("SELECT * FROM beverages", function(err, result) {

res.send(result);

});

},
    
orderBeverage : function(dataArray){
 
var params = "(CustomerUsername,beverageName,beverageCost,beverageLocation)"    
        
connection.query("INSERT INTO Orders " + params + " VALUES (?,?,?,?)",dataArray,function(err, result) {

console.log(err,"HERE!");   

});

},  

getOrders : function(res){
 
connection.query("SELECT * FROM Orders",function(err, result) {

console.log(err,"HERE!");  
    
res.send(result);    

});

},
    
cashOut : function(ordersObject,length){
     
    for(var i = 0; i < Number(length);i++){
        connection.query("UPDATE Orders SET paid = 1 WHERE id = (?)",Number(ordersObject["params["+i+"][id]"]),function(err, result) {

        console.log(err,"HERE!");
            
        });
    }
        
},    

createManagerAccount:function(dataArray){
 
var params = "(managerUsername,managerPassword,managerEmail,locationName,locationCity,locationStreetName,locationZipCode,locationImage)"    
        
connection.query("INSERT INTO ManagerAccounts " + params + " VALUES (?,?,?,?,?,?,?,?)",dataArray,function(err, result) {

console.log(err,"HERE!");   

});
},

managerAccounts : function(res){
 
    
connection.query("SELECT * FROM ManagerAccounts",function(err, result) {

//console.log(err,"HERE!");
res.send(result);

});
    
},

authenticateManagerAccount : function(res,userInfo){
 
return connection.query("SELECT * FROM ManagerAccounts",function(err, result) {

var secure = false;    
    
for(var i = 0; i < result.length; i++){
        if(result[i].managerUsername === userInfo[0] && result[i].managerPassword === userInfo[1]){
            secure = true;
        }    
}

res.send(secure);     

});

    
},
    
customerAccounts : function(res){
 
    
connection.query("SELECT * FROM CustomerAccounts",function(err, result) {

//console.log(err,"HERE!");
res.send(result);

});
    
},
    
createCustomerAccount:function(dataArray){
 
var params = "(customerUsername,customerPassword,customerEmail)"    
        
connection.query("INSERT INTO CustomerAccounts " + params + " VALUES (?,?,?)",dataArray,function(err, result) {

console.log(err,"HERE!");   

});

},
    
authenticateCustomerAccount : function(res,userInfo){
 
return connection.query("SELECT * FROM CustomerAccounts",function(err, result) {

var secure = false;    
    
for(var i = 0; i < result.length; i++){
        if(result[i].customerUsername === userInfo[0] && result[i].customerPassword === userInfo[1]){
            secure = true;
        }    
}

res.send(secure);     

});

    
},


    
}

module.exports = orm;
