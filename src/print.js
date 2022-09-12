import { Product } from "./model/Product.js";
import { question } from "readline-sync";
import moment from "moment";

export const showMenu = () => {
  return `Menu
      1. Register Product
      2. Update Product with its code
      3. Delete Product with its code
      4. Search Product with its name and code
      5. Consult all Products`;
};

export const writeNewProduct = () => {
  let code = question(`Product's code: `);
  let name = question(`Product's name: `);
  let price = question(`Product's price: `);
  let stock = question(`Product's stock: `);
  let date = moment().format('YYYY-MM-DD hh:mm:ss');

  let product = new Product(code, name, price, stock, date);
  return product;
};
