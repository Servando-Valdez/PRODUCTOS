import { ProductService } from "../services/product.service.js";
const productService = new ProductService();

export class ProductController {
  /**
   * Function that save a product
   * @param {Product} product 
   * @returns Finish the function
   */
  saveProduct = async (product) => {
    try {
      await productService.saveProduct(product);
      // return;
    } catch (error) {
      console.error("Error", error.message);
    }
  };

  /**
   * Function that update a product
   * @param {Product} product 
   */
  updateProduct = async (product) => {
    try {
      await productService.update(product);
    } catch (error) {
      console.error(error.message);
    }
  };

  /**
   * Gets all products
   * @returns Product arrays
   */
  findAllProducts = async () => {
    try {
      const result = await productService.findAll();
      return result;
    } catch (error) {
      console.error("Error", error.message);
    }
  };

  /**
   * Get a specific product
   * @param {string} search 
   * @returns Product
   */
  findOneProduct = async (search) => {
    try {
      const result = await productService.findOne(search);
      return result[0];
    } catch (error) {
      console.error(error.message);
    }
  };

  /**
   * Delete a product with the code
   * @param {string} code 
   * @returns finish the function
   */
  deleteOneProduct = async (code) => {
    try {
      await productService.deleteOne(code);
      // return;
      // return result;
    } catch (error) {
      console.error("Error", error.message);
    }
  };
}
