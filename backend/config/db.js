import mongoose from 'mongoose';

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://Delight:Tochukwu18@cluster0.ekoygox.mongodb.net/Campus-del').then(()=>console.log("DB Connected"));
}