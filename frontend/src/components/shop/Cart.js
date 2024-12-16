import React, { useState, useEffect } from "react";
import useHttp from "../../http/useHttp";
import useCarts from "../../http/useCart";
import { useNavigate } from "react-router-dom";
import "../../css/cart.css";

const Cart = () => {
  const navigate = useNavigate();
  // const [loading, err, products] = useProducts();
  const { isLoading: loading, error: err, Carts } = useCarts();
  // console.log(Carts, "cart");
  const { isLoading, error, sendRequest } = useHttp();
  const [show, setShow] = useState(false);
  // console.log(Carts,"Cart");
  const deleteItemHandler = (productId) => {
    console.log(productId);
    const requestConfig = {
      url: "http://localhost:5000/api/cartDeleteItem",
      method: "POST", // Hoặc "DELETE" nếu backend hỗ trợ
      headers: { "Content-Type": "application/json" },
      body: { productId: productId }, // Truyền productId đúng format
    };

    sendRequest(requestConfig, (responseData) => {
      // Sau khi xóa thành công, cập nhật lại giỏ hàng hoặc xử lý tương tự
      console.log("", responseData);
    });
    setShow(true);
    // navigate("/shop/cart");
    window.location.reload();
  };
  const onOrderNow =  () => {
    const requestConfig = {
      url: "http://localhost:5000/api/createOrder",
      method: "POST", // Hoặc "DELETE" nếu backend h�� tr��
      // headers: { "Content-Type": "application/json" },
      // body: { cartItems: Carts }, // Truyền productId đúng format
    };
    sendRequest(requestConfig);
    

    navigate("/shop/Orders");
  };

  return (
    // <></>
    <div>
      <main>
        {Carts.length > 0 ? (
          <>
            <ul className="cart__item-list">
              {Carts.map((product) => (
                <li key={product.id} className="cart__item">
                  <h1>{product.title}</h1>
                  <h2>Quantity: {product.cartItem.quantity}</h2>
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      deleteItemHandler(product.id);
                    }}
                  >
                    <input type="hidden" value={product.id} name="productId" />
                    <button className="btn danger" type="submit">
                      Delete
                    </button>
                  </form>
                </li>
              ))}
            </ul>
            <hr />
            <div className="centered">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  onOrderNow();
                }}
              >
                <button type="submit" className="btn">
                  Order Now!
                </button>
              </form>
            </div>
          </>
        ) : (
          <h1>No Products in Cart!</h1>
        )}
      </main>
    </div>
  );
};

export default Cart;
