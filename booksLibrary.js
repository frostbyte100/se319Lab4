'use strict';


class Book{
  _possCategories = ["Art","Science","Sport","Literature"];
  constructor(id, name){
    this._id = id;
    this._category = _possCategories[id%4];
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

class Shelf{

    constructor(category){
      this._cat = category;
      this._books = [];
    }

    addBook(name){

    }

}

class Library {
  constructor() {
    this._books = [];

  }

  createBook(bookTitle){
    var id = Math.floor(Math.random() * 1000);
    while(isIdIn(id)){
      id = Math.floor(Math.random() * 1000);
    }
    addBook( new Book(bookTitle, id ));
  }

  isIdIn(id){
    var i=0;
    for(i=0;i<this._books.length;i++){
      if(id==this._books[i]){
        return true;
      }
    }
    return false;
  }
  addBook(b){
    this._books.push(b);
  }


}
