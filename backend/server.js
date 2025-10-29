import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db.js';

import foodRouter from './routes/foodRoute.js';
import userRouter from './routes/userRoute.js';
import cartRouter from './routes/cartRoute.js';
import orderRouter from './routes/orderRoute.js';

const app = express();

// Use Render's assigned port in production, fallback to 4000 locally
const PORT = process.env.PORT || 4000;

// Middleware
app.use(express.json());

// CORS: allow your Vercel site + local dev (edit the Vercel URL if needed)
const allowedOrigins = [
  "https://campus-del-7b99.vercel.app",
  "http://localhost:5173", // for local dev
  "https://campus-del-git-main-delight-otis-projects.vercel.app", // your main production URL
  "https://campus-pxokfxbo9n-delight-otis-projects.vercel.app", // preview deployment
  "https://campus-del.vercel.app"
];


app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

// DB
connectDB();

// Routes
app.use('/api/food', foodRouter);
app.use('/images', express.static('uploads'));
app.use('/api/user', userRouter);
app.use('/api/cart', cartRouter);
app.use('/api/order', orderRouter);

app.get('/', (req, res) => {
  res.send('API Working');
});

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
