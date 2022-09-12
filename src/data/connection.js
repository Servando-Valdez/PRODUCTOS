import mysql from "mysql";

export const getConnection = () =>{
     const connetion = mysql.createConnection({
        host: "127.0.0.1",
        port: 3306,
        database: "products",
        user: "root",
        password: "123456",
        timeout: '30000'
    })
    return connetion;
}
