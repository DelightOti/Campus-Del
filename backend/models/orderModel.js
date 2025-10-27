import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema(
  {
    itemId: { type: mongoose.Schema.Types.ObjectId, ref: "food", required: true },
    quantity: { type: Number, required: true, min: 1 },
  },
  { _id: false }
);

const orderSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true }, // <-- FIX
    items: { type: [orderItemSchema], required: true },                             // structured array
    amount: { type: Number, required: true },
    address: { type: Object, required: true },
    status: { type: String, default: "Food Processing" },
    date:   { type: Date, default: Date.now },                                      // no ()
    payment:{ type: Boolean, default: false },
  },
  { minimize: false }
);

const orderModel = mongoose.models.order || mongoose.model("order", orderSchema)

export default orderModel;