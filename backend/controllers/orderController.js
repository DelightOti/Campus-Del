// controllers/orderController.js
import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Place order (creates Order + Stripe Checkout Session)
export const placeOrder = async (req, res) => {
  const frontend_url = process.env.CLIENT_URL || "http://localhost:5173";

  try {
    // user id from auth middleware (preferred) or body (fallback)
    const userId = req.userId || req.body.userId;
    if (!userId) return res.json({ success: false, message: "Missing userId / token" });

    // validate & normalize items
    const rawItems = Array.isArray(req.body.items) ? req.body.items : [];
    if (rawItems.length === 0) return res.json({ success: false, message: "Cart is empty" });

    const itemsForOrder = rawItems.map(it => ({
      itemId: it.itemId || it._id,                 // accept either key from client
      quantity: Number(it.quantity) || 1,
      name: it.name,
      price: Number(it.price),                     // expecting dollars
    }));
    if (itemsForOrder.some(it => !it.itemId)) {
      return res.json({ success: false, message: "Each item needs itemId/_id" });
    }

    // create the order as your schema expects
    const newOrder = await orderModel.create({
      userId,
      items: itemsForOrder.map(({ itemId, quantity }) => ({ itemId, quantity })),
      amount: req.body.amount,                     // optional: recompute on server
      address: req.body.address,
      payment: false,
      status: "Food Processing",
    });

    // Build Stripe line items in **USD cents**
    const CURRENCY = "usd";
    const line_items = itemsForOrder.map(it => ({
      price_data: {
        currency: CURRENCY,
        product_data: { name: it.name || "Item" },
        unit_amount: Math.round(it.price * 100),   // $ -> cents
      },
      quantity: it.quantity,
    }));

    // Delivery fee $2.00
    line_items.push({
      price_data: {
        currency: CURRENCY,
        product_data: { name: "Delivery Charges" },
        unit_amount: 200,                          // $2.00
      },
      quantity: 1,
    });

    // Create checkout session
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items,
      success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
      metadata: { userId: String(userId), orderId: String(newOrder._id) },
    });

    // Clear cart (for demos; in production, prefer doing this after webhook confirmation)
    await userModel.findByIdAndUpdate(userId, { cartData: {} });

    return res.json({ success: true, session_url: session.url });
  } catch (error) {
    console.error("placeOrder error:", error);
    return res.json({ success: false, message: "Error" });
  }
};

// Verify endpoint (simple query-based demo)
export const verifyOrder = async (req, res) => {
  const { orderId, success } = req.body;
  try {
    if (success == "true") {
      await orderModel.findByIdAndUpdate(orderId, { payment: true });
      return res.json({ success: true, message: "Paid" });
    } else {
      await orderModel.findByIdAndDelete(orderId);
      return res.json({ success: false, message: "Not Paid" });
    }
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: "Error" });
  }
};

//user orders for frontend
 const userOrders = async (req, res) => {
  try {
    const userId = req.userId;                 // ✅ from auth middleware
    if (!userId) {
      return res.status(401).json({ success: false, message: "Not authorized" });
    }

    const orders = await orderModel
      .find({ userId })
      .sort({ createdAt: -1 })                 // optional: newest first (if you have timestamps)
      .lean();

    return res.json({ success: true, data: orders });
  } catch (error) {
    console.error(error);
    return res.json({ success: false, message: "Error" });
  }
};

//Listing orders for admin panel
const listOrders = async (req,res) => {
  try {
    const orders = await orderModel.find({});
    res.json({success:true,data:orders})
  } catch (error) {
    console.log(error);
    res.json({success:false,message:"Error"})
  }
}

//api for updating order status
const updateStatus = async (req,res) => {
  try {
    await orderModel.findByIdAndUpdate(req.body.orderId,{status:req.body.status})
    res.json({success:true,message:"Status Updated"})
  } catch (error) {
    console.log(error);
    res.json({success:false,message:"Error"})
    
  }
}

export {userOrders,listOrders,updateStatus}

