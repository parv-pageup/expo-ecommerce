import mongoose from "mongoose";
import { Product } from "../model/product.model.js";

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}/expotry`
    );
    // await Product.insertMany(fakeProducts);
    // console.log("20 fake products added!");
    console.log(
      `\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.log("MONGODB connection FAILED ", error);
    process.exit(1);
  }
};

export default connectDB;
