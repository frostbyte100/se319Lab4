'use strict';

class Book {

    constructor(id, name) {
        this._id = id;
        this._possCategories = ["Art", "Science", "Sport", "Literature"];
        this._category = this._possCategories[id % 4];
        this._name = name;
        this._borrowedBy = "";
        this._availability = false;
        this._onclick;
    }

    setOnClick(){
      var id = this._id;
      var name = this._name;
      var cat = this._category;
      $("#"+this._id).click( function(){
        $("#info").html(   name + " is a(n) Ordinary Book on shelf " + cat);

      });

    }

    setCategory(cat){
        this._category = cat;
    }

    getOnClick(){
      return this._onclick;
    }

    getInfo(){
      return this.getName() + " is a(n) Ordinary Book on shelf " + this.getCategory();
    }

    checkOut(userName) {
        if (this._availability) {
            this._borrowedBy = userName;
            this._availability = false;
            return true;
        }
        return false;
    }

    checkIn(userName) {
        if (this._availability == false && userName == this._borrowedBy) {
            this._borrowedBy = "";
            this._availability = true;
            return true;
        }
        return false;
    }

    getId() {
        return this._id;
    }

    getCategory() {
        return this._category;
    }

    getName() {
        return this._name;
    }
}

class Shelf {

    constructor(category) {
        this._cat = category;
        this._books = [];
    }
    addBook(b) {
        this._books.push(b);
    }
    getCategory() {
        return this._cat;
    }
    getBooks() {
        return this._books;
    }
    getBook(i){
      return this._books[i];
    }

}

class Library {

    constructor() {
        //0 woule be the Art, 1 - Science, 2 - Sport
        this._shelf = [new Shelf("Art"), new Shelf("Science"), new Shelf("Sport"), new Shelf("Literature")];
        this._books = [];
        this._user = null;
    }

    createBook(bookTitle, category) {

        if(!this.validCategory(category)){
            window.alert("Not a valid category. Please enter Art, Science, Sport, or Literature");
            return;
        }

        var id = Math.floor(Math.random() * 1000);
        while (this.isIdIn(id)) {
            id = Math.floor(Math.random() * 1000);
        }

        var newBook = new Book(id, bookTitle);
        newBook.setCategory(category);
        this.addBook(newBook);
        newBook.setOnClick();

        $("#addBookName").val("");
        $("#addBookShelf").val("");

    }

    validCategory(category){
        var i;
        var possCategories = ["Art", "Science", "Sport", "Literature"];

        for(i = 0; i < 4; i++){
            if(category == possCategories[i]){
                return true;
            }
        }

        return false;
    }

    isIdIn(id) {
        var i = 0;
        for (i = 0; i < this._books.length; i++) {
            if (id == this._books[i]) {
                return true;
            }
        }
        return false;
    }

    addBook(b) {
        this._books.push(b);
        b.setOnClick();
        var i;
        for (i = 0; i < 4; i++) {

            if (b.getCategory() == this._shelf[i].getCategory()) {
                this._shelf[i].addBook(b);
                b.setOnClick();
            }
        }
    }

    createTable() {
        var s;
        s = "<table id=\"library\" border=2>"
        s += "<tr>";
        var x = 0;
        for (x = 0; x < 4; x++) {
            s += "<td style='background-color: grey;'>" + this._shelf[x].getCategory() + "</td>";
        }
        s += "</tr>";
        x = 0;
        var lastRow = Math.max(this._shelf[0].getBooks().length, Math.max(this._shelf[1].getBooks().length, Math.max(this._shelf[2].getBooks().length, this._shelf[3].getBooks().length)));

        var i = 0;
        for (x = 0; x < lastRow; x++) {
            s+="<tr>";
            for (i = 0; i < 4; i++) {
                if (this._shelf[i].getBook(x) === undefined) {
                    s += "<td></td>";
                } else {

                    s += "<td id='"+this._shelf[i].getBook(x).getId()+"' class='book'>" + this._shelf[i].getBook(x).getName() + "</td>";
                }
            }
            s+="</tr>";
        }

        s += "</table>";
        return s;
    }

    fillWithBooks() {
        for (var x = 0; x <= 24; x++) {
            this.addBook(new Book(x,"B"+x));
        }
    }

    getBookById(id) {
        var i;
        for (i = 0; i < this._books.length; i++) {
            if (this._books[i].getId() == id) {
                return this._books[i];
            }
        }return -1;
    }

    librarianAdd(){
        this.createBook(document.getElementById("addBookName").value, document.getElementById("addBookShelf").value);
        $("#library").remove();
        $('#librarianTable').html(this.createTable());
    }

    login(){
        var name = document.getElementById("username").value;
        var password = document.getElementById("password").value;

        if(name == "admin" && password == "admin"){
            this._user = new User(name, this);
            $("#loginMenu").css("display","none");
            $("#librarianView").css("display","block");
            $('#librarianTable').html(this.createTable());

        } else if (name.charAt(0) == 'u' || name.charAt(0) == 'U'){
            this._user = new User(name, this);
            $("#loginMenu").css("display","none");
            $("#undergradView").css("display","block");
            $('#undergradTable').html(this.createTable());

        } else {
            window.alert("Invalid username or password.");
        }

        $("#username").val("");
        $("#password").val("");

    }

    logout(){

        if(this._user._isAdmin){
            $("#librarianView").css("display","none");
        } else {
            $("#undergradView").css("display","none");
        }

        this._user = null;
        $("#loginMenu").css("display","block");
    }

}

class User {

    constructor(username) {
        this._username = username;
        this._isAdmin = false;
        this._numCheckedOut = 0;

        if(this._username == "admin" || this._username == "Admin"){
            this._isAdmin = true;
        }
    }

    getCheckedOutNum(){
      return _numCheckedOut;
    }

}

window.onload = function(){
    var lib = new Library();
    lib.fillWithBooks();

    $("#login-button").click(function(){
        lib.login();
    });
    $("#addBookBtn").click(function(){
        lib.librarianAdd();
    });
    $(".logout").click(function(){
        lib.logout();
    });

}
