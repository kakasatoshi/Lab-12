const User = require("./user");
const CartItem = require("./cart-item");
const Product = require("./Product");
const Order = require("./order");
const OrderItem = require("./order-item");
const Cart = require("./cart");

// Thiết lập mối quan hệ
// User.hasMany(CartItem);
// CartItem.belongsTo(User);

// Product.hasMany(CartItem);
// CartItem.belongsTo(Product);

// User.hasMany(Order);
// Order.belongsTo(User);

// Order.hasMany(OrderItem);
// OrderItem.belongsTo(Order);

// Product.hasMany(OrderItem);
// OrderItem.belongsTo(Product);

Product.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });
User.hasMany(Product);
User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product, { through: CartItem });
Product.belongsToMany(Cart, { through: CartItem });
Order.belongsTo(User);
User.hasMany(Order);
Order.belongsToMany(Product, { through: OrderItem });

module.exports = {
  User,
  CartItem,
  Product,
  Order,
  OrderItem,
};
