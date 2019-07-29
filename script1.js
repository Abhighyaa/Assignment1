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
      //   return true
    }
  
    function validatePassword(p,c){
      if(p.localeCompare(c))
        return false
      return true
    }
    var db;
         var request = window.indexedDB.open("newDatabase", 1);
         
         request.onerror = function(event) {
            console.log("error: ");
         };
         
         request.onsuccess = function(event) {
            db = request.result;
            console.log("success: "+ db);
         };
         
         request.onupgradeneeded = function(event) {
             db = event.target.result;
             objectStore = db.createObjectStore("login", {keyPath: "email"});
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
          
          // Index DB
        //prefixes of implementation that we want to test
         window.indexedDB = window.indexedDB || window.mozIndexedDB || 
         window.webkitIndexedDB || window.msIndexedDB;
         
         //prefixes of window.IDB objects
         window.IDBTransaction = window.IDBTransaction || 
         window.webkitIDBTransaction || window.msIDBTransaction;
         window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || 
         window.msIDBKeyRange
         
         if (!window.indexedDB) {
            window.alert("Your browser doesn't support a stable version of IndexedDB.")
         }

         var request = db.transaction(["login"], "readwrite")
            .objectStore("login")
            .add({ email: email,password: password });
            
            request.onsuccess = function(event) {
                alert("New user created!!")
            };
            
            request.onerror = function(event) {
               alert("User exists");
            }

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
    
      //Indexed DB
      var transaction = db.transaction(["login"]);
      var objectStore = transaction.objectStore("login");
      var request = objectStore.get(email);
      
      request.onerror = function(event) {
         alert("Invalid Email or password!");
      };
      
      request.onsuccess = function(event) {
         // Do something with the request.result!
         if(request.result.password.localeCompare(pwd)==0) {
            alert("User Login Allowed");
         } else {
            alert("Invalid Email or password!");
         }
      };

    });
      
});

// javascript variables and scoping