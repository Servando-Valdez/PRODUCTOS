// import { Product } from "../../model/ProductS";
import { sequelize } from "../connectionSequelize.js";
import { Product } from "../../model/ProductS.js";
import { or, Sequelize } from "sequelize";
export class ProductRepository {
  /**
   * Function that save a product
   * @param {*} product
   */
  saveProduct = async (product) => {
    await Product.create(product);

    console.log("Saved Product");
  };

  /**
   *    Gets all products
   * @returns Products array
   */
  findAll = async () => {
    const products = await Product.findAll({
      attributes: ["code", "name", "price", "stock", "createdAt", "updatedAt"],
    });
    return products;
  };

  /**
   * get a product
   * @param {string} search
   * @returns
   */
  findOne = async (search) => {
    const product = await Product.findOne({
      where: or({ code: search }, { name: search }),
    });
    return product;
  };

  /**
   * Delete a product from database
   * @param {string} code
   */
  deleteOne = async (code) => {
    let a = await Product.destroy({
      where: { code },
    });
    console.log("Deleted Product");
  };

  /**
   * Function that update a product
   * @param {*} product
   */
  update = async (product) => {
    await Product.update(
      {
        name: product.name,
        price: product.price,
        stock: product.stock,
      },
      {
        where: { code: product.code },
      }
    );
    console.log("Updated Product");
  };
}
