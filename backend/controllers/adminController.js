const Product = require("../Models/product");
const user = require("../Models/user");

// Lấy danh sách sản phẩm
exports.getProducts = async (req, res) => {
  try {
    const products = await req.user.getProducts();
    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Failed to fetch products" });
  }
};

// Thêm sản phẩm mới
exports.postAddProduct = async (req, res) => {
  const { title, price, imageUrl, description } = req.body;
  console.log(req.body,"req.body");

  try {
    const product = await req.user.createProduct({
      title,
      price,
      imageUrl,
      description,
    });
    res.status(201).json({ message: "Product created successfully", product });
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({ message: "Failed to create product" });
  }
};

// Lấy thông tin sản phẩm để chỉnh sửa
exports.getProduct = async (req, res) => {
  const prodId = req.params.productId;

  try {
    const products = await req.user.getProducts({ where: { id: prodId } });
    const product = products[0];

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(product);
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).json({ message: "Failed to fetch product" });
  }
};

// Cập nhật sản phẩm
exports.postEditProduct = async (req, res) => {
  const { productId, title, price, imageUrl, description } = req.body;
  console.log(req.body,"req.body");

  try {
    const product = await Product.findByPk(productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    product.title = title;
    product.price = price;
    product.imageUrl = imageUrl;
    product.description = description;

    await product.save();

    res.status(200).json({ message: "Product updated successfully", product });
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ message: "Failed to update product" });
  }
};

// Xóa sản phẩm
exports.postDeleteProduct = async (req, res) => {
  const { productId } = req.body;

  try {
    const product = await Product.findByPk(productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    await product.destroy();

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ message: "Failed to delete product" });
  }
};
