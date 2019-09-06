

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
                if(data[i].managerUsername === userData[0] && data[i].managerPassword === userData[1]){
                    return data[i];
                }    
        }
    
    })
}

function deleteBeverage(location,beverageClass,beverageName){
console.log("HERE!!!");
$("."+beverageClass).on("click",function(event){
event.preventDefault();
var bevName = $("."+beverageClass).attr("value")
var bevLoc = location;
$.ajax("/api/delete-beverage",{
    type: 'POST',
    data: {params :[bevLoc,bevName]}

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


    for(var i = 0; beverageArray.length;i++){
    var beverageClass = beverageArray[i].beverageName.replace(/\s/g,'');
    var beverageName = beverageArray[i].beverageName;
    var beverageLocation = beverageArray[i].beverageLocation;
    var deleteButton = "<span style='color:red;font-size: 20px;' class='"+beverageClass+"' value='"+beverageName+"'>Delete</span>";
        
    $(".beverage-list").append("<h4>Beverage Name: "+beverageName+".........Cost: $"+beverageArray[i].beverageCost+"......."+deleteButton+"</h4>");
    
        deleteBeverage(beverageLocation,beverageClass,beverageName);    
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

function sortOrders(location,data){
    
    $(".orders-list")[0].innerText = "";
    
    var total = 0;
    for(var i = 0; i < data.length; i++){
        if(data[i].beverageLocation === location && data[i].paid === 1){
        $(".orders-list").append("<h6>Customer Name: "+data[i].customerUsername+".......Beverage Name: "+data[i].beverageName+".........Price: $"+data[i].beverageCost+"</h6>"); 
        total += data[i].beverageCost;
        }
    }
        $(".total-made").text("Total Made: $" + total);
    
}

function displayOrders(location){
    $.ajax({
        url: "/api/get-orders",
        type: 'GET',

    }).then(function(data){

    sortOrders(location,data);

    });
}

function displayToScreen(data){
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
    url: "/api/get-manager-accounts",
    type: 'GET',

}).then(function(data){

findMatch(data).then(function(data){
console.log(data,"HERE!!!");
displayToScreen(data);
createBeverage(data.locationStreetName);
});
    
});