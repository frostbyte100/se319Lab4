'use strict';


class Book {

    constructor(id, name) {
        this._id = id;

        this.prototype._possCategories = ["Art", "Science", "Sport", "Literature"];
        this._category = _possCategories[id % 4];
        this._name = name;
        this._borrowedBy = "";
        this._availability = false;
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

}

class Library {

    constructor() {
        //0 woule be the Art, 1 - Science, 2 - Sport
        this._shelf = [new Shelf("Art"), new Shelf("Science"), new Shelf("Sport"), new Shelf("Literature")];
        this._books = [];
      

    }
    createBook(bookTitle) {
        var id = Math.floor(Math.random() * 1000);
        while (isIdIn(id)) {
            id = Math.floor(Math.random() * 1000);
        }
        addBook(new Book(bookTitle, id));
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
        var i;
        for (i = 0; i < 4; i++) {
            if (b.getCategory() == this._shelf[i].getCategory()) {
                this._shelf.addBook(b);
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
        var end = Math.max(this._self[0].getBooks(), Math.max(this._self[1].getBooks(), Math.max(this._self[2].getBooks(), this._self[3].getBooks())));
        var i = 0;
        for (x = 0; x < end; x++) {
            for (i = 0; i < 4; i++) {
                if (this._shelf[x].getBooks().length < end) {
                    s += "<td></td>";
                } else {
                    s += "<td id='this._shelf[x].getBooks()[i].getId()' class='book'>" + this._shelf[x].getBooks()[i].getName() + "</td>";
                }
            }
        }
        s += "</table>";
        return s;
    }

    fillWithBooks() {
        var x = 0;
        for (x = 0; x <= 24; x++) {
            this.addBook(new Book(x, "b" + x));
        }
    }
    getBookById(id) {
        var i;
        for (i = 0; i < this._books.length; i++) {
            if (this._books[i].getId() == id) {
                return this._books[i];
            }
        }
    }
    attachHandlers() {
        $('.book').each(function(i, obj) {
            $(this).click(function() {
                var book = getBookById(this.id);
                $("#info").html(book.getName() + " is a(n) Ordinary Book on shelf " + book.getCategory());
            });
        });
    }

}


let lib = new Library("John");
lib.fillWithBooks();
$('#librarySpace').html(lib.createTable());
lib.attachHandlers();

function login() {
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    if (username == "admin" && password == "admin") {
        $("#loginMenu").css("display", "none");
        //show librarian view
    } else if (username.charAt(0) == 'u' || username.charAt(0) == 'U') {
        $("#loginMenu").css("display", "none");
        //show university student view
    } else {
        window.alert("Incorrect username or password.");
    }

}
