// routes/orderRoute.js
import express from "express";
import authMiddleware from "../middleware/auth.js";
import { placeOrder, verifyOrder, userOrders, listOrders, updateStatus } from "../controllers/orderController.js";

const orderRouter = express.Router();

orderRouter.post("/place", authMiddleware, placeOrder);
orderRouter.post("/verify", verifyOrder);               // or protect it too, up to you
orderRouter.get("/user", authMiddleware, userOrders);   // <- GET (no body), uses req.userId
orderRouter.get('/list',listOrders)
orderRouter.post("/status",updateStatus)

export default orderRouter;
