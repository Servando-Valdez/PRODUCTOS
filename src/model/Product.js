import moment from "moment";

export class Product {
  // constructor(code = "", name = "", price = 0.0, stock = 0, date = null) {
  //   this.code = code;
  //   this.name = name;
  //   this.price = price;
  //   this.stock = stock;
  //   this.date = date;
  // }

  constructor(code = "", name = "", price = 0.0, stock = 0) {
    this.code = code;
    this.name = name;
    this.price = price;
    this.stock = stock;
    this.date = date;
  }

  set code(valor) {
    if (typeof valor !== "string" || valor.length !== 6) {
      throw new Error("Error: Code has more of 6 characters");
    }
    this._code = valor;
  }

  get code() {
    return this._code;
  }

  set name(valor) {
    if (valor.length > 100) {
      throw new Error("Error: Name has more of 100 characters");
    }

    if (typeof valor !== "string") {
      throw new Error("Error: Name must be a string");
    }

    this._name = valor;
  }

  get name() {
    return this._name;
  }

  set price(valor) {
    valor = parseFloat(valor);
    if (typeof valor !== "number" || !parseFloat(valor)) {
      throw new Error("Error: Price must be a number with decimals");
    }

    this._price = parseFloat(valor);
  }

  get price() {
    return this._price;
  }

  set stock(valor) {
    valor = parseInt(valor);
    if (!Number.isInteger(valor)) {
      throw new Error("Error: Stock must be a integer number");
    }
    this._stock = parseInt(valor);
  }

  get stock() {
    return this._stock;
  }

  // set date(valor) {
  //   // if (!(valor instanceof Date) || valor === null) {
  //   //   throw new Error("Date most be a Moment Object");
  //   // }
  //   this._date = valor;
  // }

  // get date() {
  //   return this._date;
  // }

  showProducto() {
    return `Producto:
        Code: ${this._code},
        Name: ${this._name},
        Price: ${parseFloat(this._price)},
        Stock: ${this._stock}`
        // Date: ${moment(this._date).format('MMMM Do YYYY')}`;
    //Date: ${this._date.format("MMMM Do YYYY")}
  }
}
