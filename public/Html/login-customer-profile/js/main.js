

async function userInfo(){
    return await $.ajax({
        url: location.href + "/userinfo",
        type: 'GET',

    }).then(function(data){
        return data;
    });
}

async function findMatch(data){
    
        return await userInfo().then(function(userData){
        
        for(var i = 0; i < data.length; i++){
                if(data[i].customerUsername === userData[0] && data[i].customerPassword === userData[1]){
                    return data[i];
                }    
        }
    
    })
}

function orderBeverage(location,beverageClass,beverageName,beverageCost){
console.log("HERE!!!");
$("."+beverageClass).on("click",function(event){
event.preventDefault();
var customerName = $(".customer-username")[0].innerText;
    
console.log(beverageCost);
$('html,body').css('cursor','pointer');
$('html,body').mousemove(function(){
$('html,body').css('cursor','auto');    
});
   
$.ajax("/api/order-beverage",{
    type: 'POST',
    data: {params :[customerName,beverageName,beverageCost,location]}

});
    
window.location.reload(true);    
   
});
    
}

function createBeverage(location){
$(".create-beverage").on("click",function(event){
event.preventDefault();
$.ajax("/api/new-beverage",{
    type: 'POST',
    data: {params :[$(".beverage-name").val(),$(".beverage-cost").val(),location]}

})
  
window.location.reload(true);    
    
});
    
}

function sortedBeverageData(beverages,profileLocation){
 
    var beveragesSorted = [];
    for(var i = 0; i < beverages.length; i++){
        if(beverages[i].beverageLocation === profileLocation){
            beveragesSorted.push(beverages[i]);
        }   
    }
    
    return beveragesSorted;
    
}

function beveragesToScreen(beverageArray){

    $(".beverage-list").text("");
    for(var i = 0; i < beverageArray.length;i++){
    var beverageClass = beverageArray[i].beverageName.replace(/\s/g,'');
    var beverageName = beverageArray[i].beverageName;
    var beverageLocation = beverageArray[i].beverageLocation;
    var orderButton = "<span style='color:green;font-size: 20px;' class='"+beverageClass+"' value='"+beverageName+"'>Order</span>";
        
    $(".beverage-list").append("<h4>Beverage Name: "+beverageName+".........Cost: $"+beverageArray[i].beverageCost+"......."+orderButton+"</h4>");
    
        orderBeverage(beverageLocation,beverageClass,beverageName,beverageArray[i].beverageCost);    
    }   
    

}

function displayBeverages(location){
$.ajax({
    url: "/api/get-beverages",
    type: 'GET',

}).then(function(data){
    
beveragesToScreen(sortedBeverageData(data,location));
    
});

}

function paidOrdersToArray(array){
    
    var returnArray = [];
        
    for(var i = 0; i < array.length; i++){
        returnArray.push(array[i]);
    }    
    
    return returnArray;
}

function cashOutButton(){

$(".cash-out").on("click",function(event){

event.preventDefault();

var paidOrders = JSON.parse($(".total").attr("value"));
    
$.ajax("/api/cash-out",{
    type: "POST",
    data: {params : paidOrders , length : paidOrders.length}
}); 
    
window.location.reload(true);    
    
});    
      
}


function sortOrders(location,data){

var customerUsername = $(".customer-username")[0].innerText;
    
console.log(data,location,customerUsername);

    $(".orders-list")[0].innerText = "";
    
    var total = 0;
    var paidOrders = [];
    for(var i = 0; i < data.length; i++){
        if(data[i].customerUsername === customerUsername && data[i].beverageLocation === location && data[i].paid === 0){
        $(".orders-list").append("<h4>Beverage Name: "+data[i].beverageName+".........Cost: $"+data[i].beverageCost+"</h4>"); 
        total += data[i].beverageCost;
        paidOrders.push(data[i]);    
        }
    }
    
    $(".total").attr("value",JSON.stringify(paidOrders));
    cashOutButton();
    $(".total").text("Total: $" + total);
    
}

function displayOrders(location){
console.log("RANDOM!!!!!");
$.ajax({
    url: "/api/get-orders",
    type: 'GET',

}).then(function(data){
    
sortOrders(location,data);
    
});

}

function getLocation(data){
   
    console.log("HERE!!!");
    
    for(var i = 0; i < data.length; i++){
        
        var location = data[i].locationName;
        var objectToString = JSON.stringify(data[i]);
        var locationClass = location.replace(/\s/g,'');
        console.log(locationClass);
        
$(".dropdown-box").append("<text  value = '"+objectToString+"' class='dropdown-item text-center "+locationClass+"'>"+location+"</text>");
        
        $("."+location.replace(/\s/g,'')).on("click",function(){
        
            console.log($(this).attr("value"));
            var managerAccountObject = JSON.parse($(this).attr("value"));
            displayToScreen(managerAccountObject);  
        });
        
    }
    
}

function displayToScreen(data){
console.log("PEOPLE!!!");
$(".location-image").attr("src",data.locationImage);
$(".manager-name").text("Manager Name: " + data.managerUsername);
$(".location-name").text("Location Name: " + data.locationName);
$(".city").text("City: " + data.locationCity);
$(".street-name").text("Street Name: " + data.locationStreetName);
$(".zipcode").text("Zipcode: " + data.locationZipCode);
displayBeverages(data.locationStreetName);
displayOrders(data.locationStreetName);
    
}

$.ajax({
    url: "/api/get-customer-accounts",
    type: 'GET',

}).then(function(data){

findMatch(data).then(function(customerObject){
$(".customer-username").html(customerObject.customerUsername);

});

$.ajax({
    url: "/api/get-manager-accounts",
    type: 'GET',

}).then(function(data){

getLocation(data);
displayToScreen(data[0]);



    
});

    
});
