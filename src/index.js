import { Product } from "./model/Product.js";
import { ProductController } from "./controller/product.controller.js";
import moment from "moment";
import { showMenu, writeNewProduct } from "./print.js";
import { question } from "readline-sync";

const productController = new ProductController();

// let id = "123459"
// let name = "doritos";
// let price = 15.5;
// let stock = 20;
// let date = moment().format('YYYY-MM-DD hh:mm:ss');
// let producto = new Product(id, name, price, stock, date);
// productController.saveProduct(producto);

// console.log(await productController.findAllProducts());
// let result = await productController.findAllProducts();
// result ? result.map(a =>console.log(a)): 'chale';
// console.log(result[0].code);
// let result = await productController.findOneProduct('a');
// console.log(result);
// console.log(await productController.deleteOneProduct('123456'));
// let result = await productController.deleteOneProduct('123456');

let running = true;

console.log(`Welcome, In this program you can to register,
update, delete, search and consult products`);

console.log(`Warning, code must not have more 6 characters and must be unique,
name must not have more 1000 characters, price most be a number, stock must be a number, 
and date must be a date`);

while (running) {
  console.log(showMenu());
  const option = question("write the number of the operation: ");
  switch (option) {
    case "1":
      //agregar
      try {
        let product = writeNewProduct();
        await productController.saveProduct(product);
      } catch (err) {
        console.error(err.message);
      }
      break;
    case "2":
      //Actualizar
      try {
        console.log("Write the code and the new product information: ");
        let product = writeNewProduct();
        await productController.updateProduct(product);
      } catch (error) {
        console.error(error.message);
      }
      break;
    case "3":
      //Eliminar
      try {
        await productController.deleteOneProduct(
          question("Write the code of the product you want delete: ")
        );
      } catch (error) {
        console.error(error.message);
      }
      break;
    case "4":
      //Buscar por code o nombre
      try {
        let result = await productController.findOneProduct(
          question("Write the code or name of the product: ")
        );
        if (result) {
          console.log(
            new Product(
              result.code,
              result.name,
              result.price,
              result.stock,
              result.date
            ).showProducto()
          );
        }
      } catch (error) {
        console.error(error.message);
      }
      break;
    case "5":
      //buscar todos
      try {
        let result = await productController.findAllProducts();
        if (result) {
          result.map((row) =>
            console.log(
              new Product(
                row.code,
                row.name,
                row.price,
                row.stock,
                row.date
              ).showProducto()
            )
          );
        } else {
          console.log("no products registered");
        }
      } catch (err) {
        console.error(err.message);
      }
      break;

    case "exit":
      //salir
      running = false;
      break;

    default:
      console.log("Please, write a number from the menu");
  }
  question("\n- Enter to continue -");
}
