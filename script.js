$(document).ready(function(){

    $("#signInModal").on("click", function(e){
        e.stopPropagation();
    });
    $("#signUpModal").on("click", function(e){
        e.stopPropagation();
    });
    $(document).click(function() {                  
        $("#signInModal").modal("hide");
        $("#signUpModal").modal("hide");
    });

    $("#password").on('keyup',function(){
        var strength=0
        password=this.value
        if(password.match(/[A-Z]+/)){
           strength+=1;
          //  console.log("Uppercase")
        }
        if(password.match(/[a-z]+/)){
           strength+=1;
          //  console.log("Lowercase")
        }
        if(password.match(/[0-9]+/)){
           strength+=1;
           //console.log("Number")
        }
        if(password.match(/[!@#$%^&*()-+]+/)){
          strength+=1;
          // console.log("Special Char")
       }
       if(password.length>=8&&password.length<=15){
        //  console.log("Length")
          strength+=1;
        }
        strength*=20
        $('.progress-bar').css('width', strength+'%')
        // console.log(strength+" str")
        
    })

    function validateEmail(email){
        //var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
        return re.test(String(email).toLowerCase());
        // return true
    }
  
    function validatePassword(p,c){
      if(p.localeCompare(c))
        return false
      return true
    }
    users = []
    $('.signUp').click(function() {
      $("#error").html('')
      check1=false
      check2=false
      check3 = false
      email=$('#email').val()
      password=$('#password').val()
      confirm=$('#confirm').val()
      strength=$('.progress-bar').css('width')
      check1 = validateEmail(email)
      check2 = validatePassword(password,confirm)
      if(strength=='342.281px')
        check3 = true
      else
        check3 = false
      // check3=true
      if(check1 && check2 && check3){
          //object implementation
          // new_user = {
          //     email:email,
          //     password:password
          // }

          // users.push(new_user)

          // localstorage
          if(localStorage.getItem(email)==null){
            localStorage.setItem(email,password)
            alert("New user created!!")
          }
          else
            alert("User exists")
          // Index DB


            
            $('#email').val('')
            $('#password').val('')
            $('#confirm').val('')
            $('.progress-bar').css('width', 0+'%')
            $("#signUpModal").modal("hide");

          //DB Integration
          // $.post("signup.php",
          // {
          //     email: email,
          //     password: password
          // },
          // function(data, status){
          //     //alert("Data: " + data + "\nStatus: " + status);
          //     if(data=='Added successfully'){
          //         window.location.replace('welcome.php?email='+email)
          //     }
          //     $('#email').val('')
          //     $('#password').val('')
          //     $('#confirm').val('')
          //     $('.progress-bar').css('width', 0+'%')
          //     $("#error").html("Email already registered ")
          //     $("#signUpModal").modal("hide");
          // });
      }
      else{
         error = ''
         if(!check1)
            error+="Invalid Email\n"
          if(!check2)
            error+="Passwords dont match\n"
          if(!check3)
            error+="Passwords not strong\n"
            $("#error").html( error)
            
      }
      //       $('#email').val('')
      //       $('#password').val('')
      //       $('#confirm').val('')
      //       $('.progress-bar').css('width', 0+'%')
      //       $("#signUpModal").modal("hide");
        
    });

    $('.signIn').click(function() {
      $("#error").html('')
      email=$('#em').val()
      pwd= $('#pass').val()
      found=0

      // object implementation
      // for(i=0;i<users.length;i++){
      //     if(users[i]['email'].localeCompare(email)==0 && users[i]['password'].localeCompare(pwd)==0){
      //         found=1
      //         alert("User Login allowed")
      //         $('#em').val('')
      //         $('#pass').val('')
      //         $("#signInModal").modal("hide");
      //         break;
      //     }
      // }

      for(i=0;i<localStorage.length;i++){
  
          if(localStorage.key(i).localeCompare(email)==0 && localStorage.getItem(localStorage.key(i)).localeCompare(pwd)==0){
              found=1
              alert("User Login allowed")
              $('#em').val('')
              $('#pass').val('')
              $("#signInModal").modal("hide");
              break;
          }
      }
      if(found==0){
        alert('Invalid Email or password')
      }


      // DB Integration
      // $.post("signin.php",
      // {
      //     email: email,
      //     password: password
      // },
      // function(data, status){
      //     //alert("Data: " + data + "\nStatus: " + status);
      //     if(data=='Correct login and password'){
      //       window.location.replace('welcome.php?email='+email)
      //     }
      // });

      // $('#em').val('')
      // $('#pass').val('')
      // $("#error").html("Incorrect email or password")
      // $("#signInModal").modal("hide");
    });
      
});

// javascript variables and scoping