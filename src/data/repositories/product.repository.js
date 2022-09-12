import { CONNREFUSED } from "dns";
import { getConnection } from "../connection.js";

export class ProductRepository {
  /**
   * Function that save a product
   * @param {Product} product 
   * @returns 
   */
  saveProduct = (product) => {
    return new Promise((resolve, reject) => {
      const con = getConnection();

      con.connect((err) => {
        if (err) {
          return reject(err.code);
        }
        const sqlProduct = `'${product.code}', '${product.name}', ${product.price}, ${product.stock}, '${product.date}'`;
        const sqlQuery = `INSERT INTO product(code, name, price, stock, date) VALUES (${sqlProduct})`;
        con.query(sqlQuery, (err, result) => {
          if (err) {
            return reject(err.code);
          }
          console.log("SAVED PRODUCT");
        });
        con.end();
      });
    });
  };

  /**
   * Function that update a product
   * @param {Product} product 
   * @returns 
   */
  update = (product) => {
    return new Promise((resolve, reject) => {
      const con = getConnection();
      con.connect((err) => {
        if (err) return reject(new Error(err.code));
        const newData = `name = '${product.name}', price = ${product.price}, stock = ${product.stock}, date =' ${product.date}' `;
        const sqlQuery = `UPDATE product set ${newData} WHERE code ='${product.code}'`;
        con.query(sqlQuery, (err, result) => {
          if (err) {
            return reject(new Error(err.code));
          }
          console.log("UPDATED PRODUCT");
        });
        con.end();
      });
    });
  };

  /**
   * Gets all products
   * @returns Product arrays
   */
  findAll = () => {
    return new Promise((resolve, reject) => {
      const con = getConnection();
      con.connect((err) => {
        if (err) {
          return reject(new Error(err.code));
        }
        const sqlQuery = "SELECT * FROM product";
        con.query(sqlQuery, (err, result, fields) => {
          if (err) return reject(new Error(err.code));
          return resolve(result);
        });
        con.end();
      });
    });
  };

  /**
   * Get a specific product
   * @param {string} search 
   * @returns product
   */
  findOne = (search) => {
    return new Promise((resolve, reject) => {
      const con = getConnection();
      con.connect((err) => {
        if (err) return reject(new Error(err));
        const sqlQuery = `SELECT * FROM product WHERE code = '${search}' OR name = '${search}'`;
        con.query(sqlQuery, (err, result) => {
          if (err) return reject(new Error("Product Not Found"));
          return resolve(result);
        });
        con.end();
      });
    });
  };

  /**
   * Delete a product with the code
   * @param {*} code 
   * @returns 
   */
  deleteOne = (code) => {
    return new Promise((resolve, reject) => {
      const con = getConnection();
      con.connect((err) => {
        if (err) return reject(err.code);
        const sqlQuery = `DELETE FROM product WHERE code = '${code}'`;
        con.query(sqlQuery, (err, result) => {
          if (err) return reject(err.code);
          console.log("DELETED PRODUCT");
          // return resolve(result.affectedRows);
        });
        con.end();
      });
    });
  };
}
