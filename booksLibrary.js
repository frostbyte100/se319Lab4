'use strict';


class Book{
  _possCatw = ["Art","Science","Sport","Literature"];
  constructor(id, name){
    this._id = id;
    this._category = cates[id%4];
    this._name = name;
    this._borrowedBy = "";
    this._availability = false;
  }


  checkOut(userName){
    if(this._availability){
      this._borrowedBy = userName;
      this._availability = false;
      return true;
    }return false;
  }

  checkIn(userName){
    if(this._availability==false && userName == this._borrowedBy){
      this._borrowedBy = "";
      this._availability = true;
      return true;
    }
    return false;
  }

  getId(){
    return this._id;
  }
}


class Library {
  constructor() {
    this._books = [];
    this._
  }

  createBook(bookTitle){
    addBook( new Book(bookTitle, Math.floor((Math.random() * 1000) )));
  }

  isIdIn(id){
    var i=0;
    for(i=0;i<this._books.length;i++){
      if()
    }

  }
  addBook(b){
    this._books.push(b);
  }


}
