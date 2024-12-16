// const mysql = require("mysql2");

// // Cấu hình kết nối
// const pool = mysql.createPool({
//   host: "localhost", // Thay bằng host của bạn
//   user: "root", // Thay bằng username của bạn
//   password: "123456", // Thay bằng password của bạn
//   database: "products", // Tên database
//   waitForConnections: true,
//   connectionLimit: 10,
//   queueLimit: 0,
// });

// // Xuất kết nối dưới dạng promise
// const promisePool = pool.promise();

// module.exports = promisePool;

const { Sequelize } = require("sequelize");

// Thiết lập kết nối với MySQL
const sequelize = new Sequelize("products", "root", "123456", {
  dialect: "mysql", // CSDL sử dụng
  host: "localhost", // Địa chỉ server
});

// Kiểm tra kết nối
sequelize
  .authenticate()
  .then(() => console.log("Database connected successfully"))
  .catch((err) => console.error("Error connecting to the database:", err));

module.exports = sequelize;
