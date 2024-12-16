const Order = require("../models/Order");
const OrderItem = require("../models/order-item");

// Tạo đơn hàng mới
exports.createOrder = async (req, res) => {
  const { userId, items } = req.body;
  try {
    const order = await Order.create({ userId });
    const orderItems = items.map((item) => ({
      ...item,
      orderId: order.id,
    }));
    await OrderItem.bulkCreate(orderItems);
    res.status(201).json({ message: "Order created successfully", order });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Lấy đơn hàng của người dùng
exports.getOrders = async (req, res) => {
  const { userId } = req.params;
  try {
    const orders = await Order.findAll({
      where: { userId },
      include: [OrderItem],
    });
    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
