import React, { useState, useEffect } from 'react';
import "./Orders.css";
import { toast } from "react-toastify";
import axios from 'axios';
import { assets } from "../../assets/assets";

const Orders = ({ url }) => {
  const [orders, setOrders] = useState([]);
  const [menuMap, setMenuMap] = useState({});   // id -> name

  const fetchAllOrders = async () => {
    try {
      const res = await axios.get(`${url}/api/order/list`);
      if (res.data.success) setOrders(res.data.data);
      else toast.error("Error loading orders");
    } catch (e) { toast.error("Failed to load orders"); }
  };

  const fetchMenu = async () => {
    try {
      const res = await axios.get(`${url}/api/food/list`); // adjust if different
      const map = Object.fromEntries((res.data.data || []).map(f => [f._id, f.name]));
      setMenuMap(map);
    } catch (e) { toast.error("Failed to load menu"); }
  };

  const statusHandler = async (event,orderId) => {
    const response = await axios.post(url+"/api/order/status",{
      orderId,
      status:event.target.value
    })
    if(response.data.success){
      await fetchAllOrders();
    }
  }

  useEffect(() => {
    fetchAllOrders();
    fetchMenu();
  }, []);

  return (
    <div className='order add'>
      <h3>Order Page</h3>
      <div className="order-list">
        {orders.map((order, i) => (
          <div key={order._id || i} className='order-item'>
            <img src={assets.parcel_icon} alt="parcel" />

            <p className='order-item-food'>
              {order.items?.map((item, j) => {
                const name = menuMap[item.itemId] || "Unknown";
                return `${name} x ${item.quantity}${j < order.items.length - 1 ? ", " : ""}`;
              })}
            </p>

            <p>Items : {order.items.length}</p>

            <p>${order.amount}</p>

            <p className="order-item-name">
              {order.address.firstName + " " + order.address.lastName}
            </p>

            <p className="order-item-address">
              {order.address.street},<br />
              {order.address.city}, {order.address.state}, {order.address.country}, {order.address.zipcode}
            </p>

            <p className="order-item-phone">{order.address.phone}</p>

            <select onChange={(event)=>statusHandler(event,order._id)} value={order.status} defaultValue={order.status}>
              <option value="Food Processing">Food Processing</option>
              <option value="Out for delivery">Out for delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
