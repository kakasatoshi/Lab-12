const CartItem = require('../Models/cart-item');

// Lấy giỏ hàng của người dùng
exports.getCart = async (req, res) => {
  const { userId } = req.params;
  try {
    const cartItems = await CartItem.findAll({ where: { userId } });
    res.status(200).json(cartItems);
  } catch (error) {
    console.error("Error fetching cart items:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Thêm sản phẩm vào giỏ hàng
exports.addToCart = async (req, res) => {
  const { productId, quantity, userId } = req.body;
  try {
    const existingItem = await CartItem.findOne({ where: { productId, userId } });
    if (existingItem) {
      existingItem.quantity += quantity;
      await existingItem.save();
    } else {
      await CartItem.create({ productId, quantity, userId });
    }
    res.status(200).json({ message: "Product added to cart" });
  } catch (error) {
    console.error("Error adding to cart:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Xóa sản phẩm khỏi giỏ hàng
exports.deleteCartItem = async (req, res) => {
  const { id } = req.params;
  try {
    const cartItem = await CartItem.findByPk(id);
    if (!cartItem) {
      return res.status(404).json({ message: "Cart item not found" });
    }
    await cartItem.destroy();
    res.status(200).json({ message: "Cart item deleted successfully" });
  } catch (error) {
    console.error("Error deleting cart item:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
