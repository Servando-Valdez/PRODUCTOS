import { Sequelize, BIGINT, STRING } from "sequelize";

export const sequelize = new Sequelize({
    database: "product",
    username: "root",
    password: "123456",
    host: "127.0.0.1",
    dialect: "mysql",
  });
