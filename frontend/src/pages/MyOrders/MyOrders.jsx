import React, { useEffect, useState, useContext } from "react";
import "./MyOrders.css";
import axios from "axios";
import { StoreContext } from "../../context/StoreContext";
import { assets } from "../../assets/assets";

const MyOrders = () => {
  const { url, token, food_list } = useContext(StoreContext);
  const [data, setData] = useState([]);

  // helper function to get the food name by its ID
  const nameById = (id) => {
    const item = food_list.find((f) => f._id === id);
    return item ? item.name : "Unknown";
  };

  // ✅ move fetchOrders OUTSIDE of useEffect
  const fetchOrders = async () => {
    if (!token) return;
    try {
      const res = await axios.get(`${url}/api/order/user`, {
        headers: { token },
      });
      setData(res.data?.data || []);
      console.log("Fetched Orders:", res.data);
    } catch (err) {
      console.error("fetchOrders error:", err?.response?.data || err.message);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [token, url]);

  return (
    <div className="my-orders">
      <h2>My Orders</h2>
      <div className="container">
        {data.map((order, index) => (
          <div key={index} className="my-orders-order">
            <img src={assets.parcel_icon} alt="parcel" />
            <p>
              {order.items
                .map((item) => `${nameById(item.itemId)} x ${item.quantity}`)
                .join(", ")}
            </p>
            <p>${order.amount}.00</p>
            <p>Items: {order.items.length}</p>
            <p>
              <span>&#x25cf;</span> <b>{order.status}</b>
            </p>
            <button onClick={fetchOrders}>Track Order</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyOrders;
