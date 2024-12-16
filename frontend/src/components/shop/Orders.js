import React, { useEffect, useState } from "react";
import useHttp from "../../http/useHttp";

const Orders = () => {
  const { isLoading, error, sendRequest } = useHttp();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const applyData = (data) => {
      setOrders(data);
    };

    sendRequest(
      {
        url: "http://localhost:5000/api/orders",
        method: "GET",
      },
      applyData
    );
  }, []);

  return (
    <>
                 
                <main>
                    {orders.length <= 0 ? (
                        <h1>Nothing there!</h1>
                    ) : (
                        <ul>
                            {orders.map((order) => (
                                <li key={order.id}>
                                    <h1># {order.id}</h1>
                                    <ul>
                                        {order.products.map((product, index) => (
                                            <li key={index}>
                                                {product.title} ({product.orderItem.quantity})
                                            </li>
                                        ))}
                                    </ul>
                                </li>
                            ))}
                        </ul>
                    )}
                </main>
    </>
  );
};

// Example of Head, Navigation, and End components

export default Orders;
