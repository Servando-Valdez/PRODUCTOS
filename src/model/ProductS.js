import { Sequelize, STRING, FLOAT, BIGINT, Model } from "sequelize";
import { sequelize } from "../data/connectionSequelize.js";

// class Product extends Model{

// }
export const Product = sequelize.define(
  "Product",
  {
    code: { type: STRING, max: 6, primaryKey: true, allowNull: false, unique: true },
    name: { type: STRING, max: 50, allowNull: false },
    price: { type: FLOAT, allowNull: false },
    stock: { type: BIGINT, allowNull: false },
  },
  { tableName: "products" }
);

(async () => {
  await Product.sync()
    .then((data) => {
      console.log("Table and model synced succesfully");
    })
    .catch((err) => {
      console.log("Error syncing the table nad model");
    });
})();
