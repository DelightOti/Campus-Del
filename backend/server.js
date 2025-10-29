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

// ✅ Allow these specific origins (add your latest Vercel preview if needed)
const allowedOrigins = [
  "http://localhost:5173",
  "https://campus-del.vercel.app",
  "https://campus-del-7b99.vercel.app",
  "https://campus-del-git-main-delight-otis-projects.vercel.app",
  "https://campus-del-7b99-git-main-delight-otis-projects.vercel.app",
  "https://campus-del-7b99-cbz2y3bpg-delight-otis-projects.vercel.app", // 👈 your current deployment
  "https://campus-pxokfxbo9n-delight-otis-projects.vercel.app" // older preview
];

// ✅ Apply CORS before routes
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error(`CORS blocked: ${origin}`));
      }
    },
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// ✅ Handle preflight OPTIONS requests globally
app.options("*", cors());

// ✅ Connect DB
connectDB();

// ✅ Routes
app.use('/api/food', foodRouter);
app.use('/images', express.static('uploads'));
app.use('/api/user', userRouter);
app.use('/api/cart', cartRouter);
app.use('/api/order', orderRouter);

app.get('/', (req, res) => {
  res.send('API Working ✅');
});

// ✅ Start server
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
