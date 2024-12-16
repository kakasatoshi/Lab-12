const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const sequelize = require("./util/database.js");
const User = require("./models/user");
const CartItem = require("./models/cart-item");
const Product = require("./models/Product");
const Order = require("./models/order");
const OrderItem = require("./models/order-item");
const Cart = require("./models/cart");

const app = express();

Product.belongsTo(User, { constraints: true, onDelete: "CASCADE" });
User.hasMany(Product);
User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product, { through: CartItem });
Product.belongsToMany(Cart, { through: CartItem });
Order.belongsTo(User);
User.hasMany(Order);
Order.belongsToMany(Product, { through: OrderItem });

app.use(bodyParser.json());
app.use(
  cors({
    origin: "http://localhost:3000", // Chỉ cho phép yêu cầu từ frontend của bạn
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(async (req, res, next) => {
  const user = await User.findByPk(1);
  if (!user) {
    return res.status(500).json({ message: "User not found" });
  }
  req.user = user;
  next();
});

const apiRoutes = require("./routes/shop.js");
const adminRoutes = require("./routes/admin.js");

app.use("/admin", adminRoutes);
app.use("/api", apiRoutes);

sequelize
  .sync({ alter: process.env.NODE_ENV !== "production" }) // Ensures tables are re-created; remove `force` for production
  .then(() => {
    return User.findByPk(1); // Updated method
  })
  .then((user) => {
    if (!user) {
      return User.create({ name: "Max", email: "test@test.com" });
    }
    return user;
  })
  .then((user) => {
    console.log(user);
    return user.createCart();
  })
  .then((cart) => {
    app.listen(5000, () => {
      console.log("Server is running on port 5000");
    });
  })
  .catch((err) => {
    console.error(err);
  });
