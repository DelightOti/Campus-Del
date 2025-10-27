import userModel from "../models/userModel.js";

// add items to user cart
const addToCart = async (req, res) => {
  try {
    const userId = req.userId;           // ✅ from middleware
    const { itemId } = req.body;         // only this comes from body

    const userData = await userModel.findById(userId);
    const cartData = userData.cartData;

    if (!cartData[itemId]) {
      cartData[itemId] = 1;
    } else {
      cartData[itemId] += 1;
    }

    await userModel.findByIdAndUpdate(userId, { cartData });
    res.json({ success: true, message: "Added To Cart" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

// remove items from user cart
const removeFromCart = async (req, res) => {
  try {
    const userId = req.userId;           // ✅ from middleware
    const { itemId } = req.body;

    const userData = await userModel.findById(userId);
    const cartData = userData.cartData;

    if (cartData[itemId] > 0) {
      cartData[itemId] -= 1;
    }

    await userModel.findByIdAndUpdate(userId, { cartData });
    res.json({ success: true, message: "Removed From Cart" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

// fetch user cart data
const getCart = async (req, res) => {
  try {
    const userId = req.userId;           // ✅ from middleware

    const userData = await userModel.findById(userId);
    const cartData = userData.cartData;

    res.json({ success: true, cartData });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

export { addToCart, removeFromCart, getCart };
