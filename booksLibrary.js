'use strict';

class Book {

    constructor(id, name) {
        this._id = id;
        this._possCategories = ["Art", "Science", "Sport", "Literature"];
        this._category = this._possCategories[id % 4];
        this._name = name;
        this._borrowedBy = "";
        this._availability = true;
        this._onclick;
    }


    removeHandlers() {
        var id = this._id;
        $("#" + id).off('click');
    }

    setOnAdminClick() {
        var id = this._id;
        var name = this._name;
        var cat = this._category;
        $("#" + id).click(function() {
            $("#info").html(name + " is a(n) Ordinary Book on shelf " + cat);
        });

    }

    setUserClick(_user) {
        var User = _user;
        var id = this._id;
        var book = this;
        $("#" + this._id).click(function() {
            console.log("trying");
            if (book._availability) {
                if (User._numCheckedOut < 2) {
                    $("#" + id).css("background-color", "red");
                    book._borrowedBy = User._username;
                    book._availability = false;
                    User.checkOut();
                }else{
                  window.alert("You can only check out two books!");
                }
            } else {
                if(book._borrowedBy !== "" && book._borrowedBy!==User._username){
                  window.alert("You can't check in a book checked out by another user!");
                }else{
                  $("#" + id).css("background-color", "white");
                  book._borrowedBy = "";
                  book._availability = true;
                  User.checkIn();
                }

            }
        });
    }
    setCategory(cat) {
        this._category = cat;
    }

    getOnClick() {
        return this._onclick;
    }

    getInfo() {
        return this.getName() + " is a(n) Ordinary Book on shelf " + this.getCategory();
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
    getBook(i) {
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

        if (!this.validBookTitle(bookTitle)) {
            window.alert("Not a valid book Title, please input some text");
            return;
        }
        if (!this.validCategory(category)) {
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


        $("#addBookName").val("");
        $("#addBookShelf").val("");

    }

    validBookTitle(bookTitle) {
        return bookTitle != "";
    }
    validCategory(category) {
        var i;
        var possCategories = ["Art", "Science", "Sport", "Literature"];

        for (i = 0; i < 4; i++) {
            if (category == possCategories[i]) {
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
        b.setOnAdminClick();
        var i;
        for (i = 0; i < 4; i++) {

            if (b.getCategory() == this._shelf[i].getCategory()) {
                this._shelf[i].addBook(b);

            }
        }
    }

    createTable() {
        return this.createTableHorizontal();
        // var s;
        // s = "<table id=\"library\" border=2>"
        // s += "<tr>";
        // var x = 0;
        // for (x = 0; x < 4; x++) {
        //     s += "<td style='background-color: grey;'>" + this._shelf[x].getCategory() + "</td>";
        // }
        // s += "</tr>";
        // x = 0;
        // var lastRow = Math.max(this._shelf[0].getBooks().length, Math.max(this._shelf[1].getBooks().length, Math.max(this._shelf[2].getBooks().length, this._shelf[3].getBooks().length)));
        //
        // var column = 0;
        // var row = 0;
        // for (row = 0; row < lastRow; row++) {
        //     s += "<tr>";
        //     for (column = 0; column < 4; column++) {
        //         if (this._shelf[column].getBook(row) === undefined) {
        //             s += "<td></td>";
        //         } else {
        //
        //             s += "<td id='" + this._shelf[column].getBook(row).getId() + "' class='book'>" + this._shelf[column].getBook(row).getName() + "</td>";
        //         }
        //     }
        //     s += "</tr>";
        // }
        //
        // s += "</table>";
        // s += "<div id='info'></div>";
        // return s;
    }

    createTableHorizontal(){
      var s;
      s = "<table id=\"library\" border=2>";

      var x = 0;
      var row = 0;
      var column =0;
      var lastRow = Math.max(this._shelf[0].getBooks().length, Math.max(this._shelf[1].getBooks().length, Math.max(this._shelf[2].getBooks().length, this._shelf[3].getBooks().length)));

      for(row=0;row<4;row++){
        s+="<tr>";
        for(column=0;column<lastRow+1;column++){

          if(column==0){
            s+="<td style='background-color: grey;'>"+this._shelf[row].getCategory()+"</td>";
          }else{
            //if(this._shelf[row].length==lastRow){
            //  s += "<td id='" + this._shelf[row].getBook(column-1).getId() + "' >" + this._shelf[row].getBook(column-1).getName() + "</td>";
          //  }else{
              if (this._shelf[row].getBook(column-1) === undefined) {
                  s += "<td></td>";
              } else {

                  s += "<td id='" + this._shelf[row].getBook(column-1).getId() + "' >" + this._shelf[row].getBook(column-1).getName() + "</td>";
              }
      //      }
          }

        }
        s+="</tr>";
      }

      s += "</table>";
      s += "<div id='info'></div>";
      return s;
    }
    fillWithBooks() {
        for (var x = 0; x <= 24; x++) {
            this.addBook(new Book(x, "B" + x));
        }
    }

    addHandlers() {

        for (var i = 0; i < this._books.length; i++) {
            this._books[i].removeHandlers();
            if (this._user._isAdmin) {

                this._books[i].setOnAdminClick();
            } else if (this._user !== null && this._user !== undefined) {
                this._books[i].setUserClick(this._user);
            }else{
              console.log("Weird");
            }
        }
    }

    getBookById(id) {
        return this._books[id];
    }

    librarianAdd() {
        this.createBook(document.getElementById("addBookName").value, document.getElementById("addBookShelf").value);
        $("#library").remove();
        $('#librarianTable').html(this.createTable());
        this.addHandlers();
    }

    login() {
        var name = document.getElementById("username").value;
        var password = document.getElementById("password").value;

        if (name == "admin" && password == "admin") {
            this._user = new User(name, this);
            $("#loginMenu").css("display", "none");
            $("#librarianView").css("display", "block");
            $('#librarianTable').html(this.createTable());

            this.addHandlers();
        } else if (name.charAt(0) == 'u' || name.charAt(0) == 'U') {
            this._user = new User(name, this);
            $("#loginMenu").css("display", "none");
            $("#undergradView").css("display", "block");
            $('#undergradTable').html(this.createTable());
            this.addHandlers();
        } else {
            window.alert("Invalid username or password.");
        }

        $("#username").val("");
        $("#password").val("");

    }

    logout() {

        if (this._user._isAdmin) {
            $("#librarianView").css("display", "none");
        } else {
            $("#undergradView").css("display", "none");
        }

        this._user = null;
        $("#loginMenu").css("display", "block");
    }

}

class User {

    constructor(username) {
        this._username = username;
        this._isAdmin = false;
        this._numCheckedOut = 0;

        if (this._username == "admin" || this._username == "Admin") {
            this._isAdmin = true;
        }
    }

    checkOut() {
        this._numCheckedOut++;
    }
    checkIn() {
        this._numCheckedOut--;
    }

}

window.onload = function() {
    var lib = new Library();
    lib.fillWithBooks();

    $("#login-button").click(function() {
        lib.login();
    });
    $("#addBookBtn").click(function() {
        lib.librarianAdd();
    });
    $(".logout").click(function() {
        lib.logout();
    });

}
