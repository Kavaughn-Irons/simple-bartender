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
    var blankbool = !$(".username").val() || !$(".email").val() || !$(".password").val() || !$(".password-retype").val()
    var array = {params : [username,password,email]};    
    if( password === passwordRetype){
        
        if(blankbool === false){
            $(".errors").css("color","green");
            $(".errors").text("Account Created!")
            $.ajax("/api/customer",{
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

//-----------------------------------------------------------------------------------------------------

$(".sign-in").on("click",function(event){
    event.preventDefault();
        
    $.ajax("/api/customer-sign-in",{
        type: "POST",
        data: {url : $(".username-sign-in").val().replace(/\s/g,'')+$(".password-sign-in").val(), userinfo : [$(".username-sign-in").val(),$(".password-sign-in").val()]}
    }).then(function(data){

        if(data){
        location.href = "/api/customer-sign-in/"+$(".username-sign-in").val().replace(/\s/g,'')+$(".password-sign-in").val();  
        }
        console.log(data);

    })

});

