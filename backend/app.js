const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoConnect = require("./util/database").mongoConnect;
const User = require("./models/user");
const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const errorController = require("./controllers/error");

const app = express();

// Middleware
app.use(bodyParser.json()); // Dùng để xử lý JSON
app.use(cors()); // Cho phép ReactJS truy cập API
app.use((req, res, next) => {
  User.findById("5baa2528563f16379fc8a610")
    .then((user) => {
      req.user = new User(user.name, user.email, user.cart, user._id);
      next();
    })
    .catch((err) => console.log(err));
});

// Routes
app.use("/admin", adminRoutes);
app.use("/shop", shopRoutes);

// Xử lý lỗi 404
app.use((req, res, next) => {
  res.status(404).json({ message: "Route not found" });
});

// Kết nối MongoDB và chạy server
mongoConnect(() => {
  app.listen(5000, () => {
    console.log("Server is running on http://localhost:5000");
  });
});
