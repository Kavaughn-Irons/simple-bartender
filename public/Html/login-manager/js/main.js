const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');

signUpButton.addEventListener('click', () => container.classList.add('right-panel-active'));

signInButton.addEventListener('click', () => container.classList.remove('right-panel-active'));

$(".sign-up").on("click",function(event){

event.preventDefault();
var username = $(".username").val();
var email = $(".email").val();
var password = $(".password").val();
var passwordRetype = $(".password-retype").val();
var locationName = $(".location-name").val();
var locationCity = $(".city").val();
var locationStreetName = $(".street-name").val();
var locationZipCode = $(".zip-code").val();
var locationImage = $(".location-image").val();

var blanks = !$(".b1").val()||!$(".b2").val()||!$(".b3").val()||!$(".b4").val() ||!$(".b5").val() ||!$(".b6").val() ||!$(".b7").val() ||!$(".b8").val()||!$(".b9").val()   

var array = {params : [username,password,email,locationName,locationCity,locationStreetName,locationZipCode,locationImage]};    

console.log(array);
 
if(password === passwordRetype){

    if(blanks === false){
        $(".errors").css("color","green");
        $(".errors").text("Account Created!");
        $.ajax("/api/manager",{
            type: "POST",
            data: array
        });   
    }else{
    $(".errors").css("color","red");
    $(".errors").text("Fill in all blanks!");    
    }

}else{
$(".errors").css("color","red");
$(".errors").text("Passwords Don't Match!");

}   

});

//--------------------------------------------------------------------------------------------

$(".sign-in").on("click",function(event){
event.preventDefault();
console.log($(".username-sign-in").val().replace(/\s/g,''));
$.ajax("/api/sign-in",{
    type: "POST",
    data: {url : $(".username-sign-in").val().replace(/\s/g,'')+$(".password-sign-in").val(), userinfo : [$(".username-sign-in").val(),$(".password-sign-in").val()]}
}).then(function(data){

if(data){
location.href = "/api/sign-in/"+$(".username-sign-in").val().replace(/\s/g,'')+$(".password-sign-in").val();  
}

})



    
});