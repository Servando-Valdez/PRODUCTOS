import { ProductController } from "./controller/product.controller.js";
import moment from "moment";
import { Product } from "./model/ProductS.js";
import { showMenu } from "./print.js";
import { question } from "readline-sync";
const productController = new ProductController();
// const productService = new ProductService();
// let xd = await Product.findAll({
//   attributes: ["code", "name", "price", "stock", "createdAt", "updatedAt"]
// })
// console.log(xd);
// xd.map(p => console.log(p.getDataValue));
// let xd2 = xd.map(p=>Product.build());
// console.log(xd);
// let code = "123456";
// let name = "atun";
// let price = 15.5;
// let stock = 20;
// await productService.saveProduct(Product.build({ code, name, price, stock }).dataValues);
// let product = Product.build({code: code, name: name, price: price, stock: stock})
// await Product.create(product)
// await Product.create({
//   code: code,
//   name: name,
//   price: price,
//   stock: stock
// }, {fields: ['code', 'name', 'price', 'stock']});
// let product = Product.build({code: code, name: name, price: price, stock: stock});

// await product.save();
// if(product instanceof Product){
//   console.log(product);
// }else{
//   console.log('chale padrino');
// }
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

const writeNewProduct = () => {
  let code = question(`Product's code: `);
  let name = question(`Product's name: `);
  let price = question(`Product's price: `);
  let stock = question(`Product's stock: `);
  // let date = moment().format('YYYY-MM-DD hh:mm:ss');

  // let product = new Product(code, name, price, stock, date);
  let product = Product.build({ code, name, price, stock }).dataValues;
  return product;
};

const printProduct = (product) => {
  // console.log(product.toJSON());
  // const { code, name, price, stock, createdAt, updatedAt } = product.toJSON();
  const { code, name, price, stock, createdAt, updatedAt } = product.dataValues;
  console.log(
    `Product: 
      code: ${code},
      name: ${name},
      price: ${price},
      stock: ${stock},
      created: ${moment(createdAt).format("MMMM Do YYYY, h:mm:ss a")},
      updated: ${moment(updatedAt).format("MMMM Do YYYY, h:mm:ss a")}`);
};

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
          printProduct(result);
        }else{
          console.log('Product Not Found');
        }
      } catch (error) {
        console.error(error.message);
      }
      break;
    case "5":
      //buscar todos
      try {
        let result = await productController.findAllProducts();
        // console.log(result);
        if (result) {
          result.map(
            (row) => {
              // printProduct(row);
              printProduct(row)
            }
          );
        }else {
          console.log("no products registered");
        }
      } catch (err) {
        console.error(err.message);
      }
      break;

    case "6":
      //salir
      running = false;
      // Product.close();
      break;

    default:
      console.log("Please, write a number from the menu");
  }
  question("\n- Enter to continue -");
}
