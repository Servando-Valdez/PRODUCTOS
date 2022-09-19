// import { ProductRepository } from "../data/repositories/product.repository.js";
import { ProductRepository } from "../data/repositories/productSequelize.repository.js";
const productRepository = new ProductRepository();
export class ProductService {
  /**
   * Function that save a product
   * @param {*} product
   * @returns
   */
  saveProduct = async (product) => {
    if (
      !product ||
      !product.code ||
      !product.name ||
      !product.price ||
      !product.stock
    ) {
      throw new Error("Product is not complete");
    }

    let result = await productRepository.findOne(product.code);
    if (result !== null)
      throw new Error("Product Repeated");
    await productRepository.saveProduct(product);
    return;
  };

  /**
   * Function that update a product
   * @param {*} product
   */
  update = async (product) => {
    let result = await productRepository.findOne(product.code);
    if (result === null || result === undefined || result.length === 0)
      throw new Error("Product Not Found to update");
    await productRepository.update(product);
  };

  /**
   * Gets all products
   * @returns Product arrays
   */
  findAll = async () => {
    let result = await productRepository.findAll();
    if (!result) throw new Error("products could not be obtained");
    return result;
  };

  /**
   * Get a specific product
   * @param {*} search
   * @returns
   */
  findOne = async (search) => {
    let result = await productRepository.findOne(search);
    if (result.length === 0 || result === null) throw new Error("product could not be obtained");
    return result;
  };

  /**
   * Delete a product with the code
   * @param {*} code
   * @returns
   */
  deleteOne = async (code) => {
    let result = await productRepository.findOne(code);
    if (result === null || result === undefined || result.length === 0)
      throw new Error("Product Not Found to Delete");
    await productRepository.deleteOne(code);
    // return;
  };
}
