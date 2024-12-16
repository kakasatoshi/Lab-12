const Product = require("../models/product");

// Lấy danh sách tất cả sản phẩm
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.findAll();
    console.log(products);
    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Failed to fetch products" });
  }
};

// Lấy thông tin chi tiết của một sản phẩm
exports.getProduct = async (req, res) => {
  const prodId = req.params.productId;
  try {
    const product = await Product.findByPk(prodId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).json({ message: "Failed to fetch product" });
  }
};

// Lấy danh sách sản phẩm trong giỏ hàng
exports.getCart = async (req, res) => {
  try {
    const cart = await req.user.getCart();
    const products = await cart.getProducts();
    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching cart:", error);
    res.status(500).json({ message: "Failed to fetch cart" });
  }
};

// Thêm sản phẩm vào giỏ hàng
exports.postCart = async (req, res) => {
  const prodId = req.body.id;
  console.log("postCart", prodId);
  let fetchedCart;
  let newQuantity = 1;

  try {
    const cart = await req.user.getCart(); // Lấy giỏ hàng của user hiện tại
    if (!cart) {
      return res.status(500).json({ message: "Cart not found" });
    }
    fetchedCart = cart;

    const products = await cart.getProducts({ where: { id: prodId } });
    let product;

    if (products.length > 0) {
      product = products[0];
      const oldQuantity = product.cartItem.quantity;
      newQuantity = oldQuantity + 1;
    } else {
      product = await Product.findByPk(prodId);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
    }

    // Thêm sản phẩm vào giỏ hàng (chuyển instance product)
    await fetchedCart.addProduct(product.id, {
      through: { quantity: newQuantity },
    });

    res.status(200).json({ message: "Product added to cart successfully" });
  } catch (error) {
    console.error("Error adding product to cart:", error);
    res.status(500).json({
      message: `Failed to add product to cart ${req.body[0].id}`,
      error: error.message,
    });
  }
};

// Xóa sản phẩm khỏi giỏ hàng
exports.postCartDeleteProduct = async (req, res) => {
  const prodId = req.body.productId;

  try {
    const cart = await req.user.getCart();
    const products = await cart.getProducts({ where: { id: prodId } });

    if (products.length === 0) {
      return res.status(404).json({ message: "Product not found in cart" });
    }

    const product = products[0];
    await product.cartItem.destroy();

    res.status(200).json({ message: "Product removed from cart successfully" });
  } catch (error) {
    console.error("Error deleting product from cart:", error);
    res.status(500).json({ message: "Failed to delete product from cart" });
  }
};

// Tạo đơn hàng
exports.postOrder = async (req, res) => {
  try {
    const cart = await req.user.getCart();
    const products = await cart.getProducts();

    const order = await req.user.createOrder();
    await order.addProducts(
      products.map((product) => {
        product.orderItem = { quantity: product.cartItem.quantity };
        return product;
      })
    );

    // Xóa giỏ hàng sau khi tạo đơn hàng
    await cart.setProducts(null);

    res.status(201).json({ message: "Order placed successfully" });
  } catch (error) {
    console.error("Error placing order:", error);
    res.status(500).json({ message: "Failed to place order" });
  }
};

// Lấy danh sách đơn hàng
exports.getOrders = async (req, res) => {
  try {
    const orders = await req.user.getOrders({ include: ["products"] });
    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ message: "Failed to fetch orders" });
  }
};
