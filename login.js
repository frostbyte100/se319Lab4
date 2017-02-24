function login(){
    username = document.getElementById("username").value;
    password = document.getElementById("password").value;
    librarian = false;
    undergraduate = false;

    console.log("in");

    if(username == "admin" && password == "admin"){
        librarian = true;
    } else if (username.charAt(0) == 'u' || username.charAt(0) == 'U'){
        undergraduate = true;
    } else {
        alert("Incorrect username or password.");
    }

    if(username || librarian){
        window.location.href = "booksLibrary.html";
    }

}
