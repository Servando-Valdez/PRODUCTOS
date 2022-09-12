import { ProductRepository } from "../data/repositories/product.repository.js";
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
      !product.stock ||
      !product.date
    ) {
      throw new Error("Product is not complete");
    }
    let validateCode = await productRepository.findOne(product.code);
      // console.log(validateCode>0);
    if (validateCode.length>0) {
      throw new Error("This Product is Registred");
    }
    await productRepository.saveProduct(product);
    // return;
  };

  /**
   * Function that update a product
   * @param {*} product 
   */
  update = async(product) =>{
    let result = await productRepository.findOne(product.code);
    if(result === null || result === undefined || result.length === 0)
      throw new Error('Product Not Found to update');
    await productRepository.update(product);
  }

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
    // console.log(result);
    if (result.length === 0) throw new Error("product could not be obtained");
    return result;
  };

  /**
   * Delete a product with the code
   * @param {*} code 
   * @returns 
   */
  deleteOne = async (code) => {
    let result = await productRepository.findOne(code);
    console.log(result);
    if (result === null || result === undefined || result.length === 0)
      throw new Error("Product Not Found to Delete");
    await productRepository.deleteOne(code);
    // return;
  };
}
