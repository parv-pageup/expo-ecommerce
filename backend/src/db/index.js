import mongoose from "mongoose";
import { Product } from "../model/product.model.js";

// const fakeProducts = [
//   {
//     title: "Wireless Bluetooth Headphones",
//     description: "High-quality over-ear headphones with noise cancellation.",
//     price: 129.99,
//     image: "https://images.pexels.com/photos/1236701/pexels-photo-1236701.jpeg",
//     category: "Electronics",
//     tags: ["wireless", "noise-cancelling", "headphones"],
//   },
//   {
//     title: "Smartphone Case - Leather",
//     description: "Premium leather case for iPhone 12 Pro Max.",
//     price: 49.99,
//     image: "https://images.pexels.com/photos/1624496/pexels-photo-1624496.jpeg",
//     category: "Fashion",
//     tags: ["leather", "iPhone", "case"],
//   },
//   {
//     title: "Organic Green Tea",
//     description: "100% organic green tea leaves, rich in antioxidants.",
//     price: 15.99,
//     image: "https://images.pexels.com/photos/443446/pexels-photo-443446.jpeg",
//     category: "food",
//     tags: ["organic", "green tea", "healthy"],
//   },
//   {
//     title: "Cotton Bed Sheet Set",
//     description: "Soft and breathable 4-piece bed sheet set.",
//     price: 39.99,
//     image: "https://images.pexels.com/photos/1386604/pexels-photo-1386604.jpeg",
//     category: "Home",
//     tags: ["cotton", "bed sheet", "bedding"],
//   },
//   {
//     title: "Stainless Steel Water Bottle",
//     description: "Durable and eco-friendly 500ml water bottle.",
//     price: 19.99,
//     image: "https://images.pexels.com/photos/1591447/pexels-photo-1591447.jpeg",
//     category: "Sports",
//     tags: ["stainless steel", "water bottle", "eco-friendly"],
//   },
//   {
//     title: "Yoga Mat - Non-slip",
//     description: "Extra thick yoga mat with non-slip surface.",
//     price: 29.99,
//     image: "https://images.pexels.com/photos/1450155/pexels-photo-1450155.jpeg",
//     category: "Sports",
//     tags: ["yoga mat", "non-slip", "exercise"],
//   },
//   {
//     title: "Wireless Charger Pad",
//     description:
//       "Fast charging wireless pad compatible with Qi-enabled devices.",
//     price: 24.99,
//     image: "https://images.pexels.com/photos/1402787/pexels-photo-1402787.jpeg",
//     category: "Electronics",
//     tags: ["wireless charger", "fast charging", "Qi"],
//   },
//   {
//     title: "Leather Wallet",
//     description: "Slim and stylish leather wallet with RFID protection.",
//     price: 59.99,
//     image:
//       "https://images.pexels.com/photos/36717/amazing-animal-beautiful-beautifull.jpg",
//     category: "Fashion",
//     tags: ["leather", "wallet", "RFID"],
//   },
//   {
//     title: "Bluetooth Smart Watch",
//     description: "Multi-functional smartwatch with fitness tracking.",
//     price: 199.99,
//     image: "https://images.pexels.com/photos/1366919/pexels-photo-1366919.jpeg",
//     category: "Electronics",
//     tags: ["smartwatch", "fitness tracking", "Bluetooth"],
//   },
//   {
//     title: "Portable Speaker",
//     description: "Compact and waterproof Bluetooth speaker.",
//     price: 79.99,
//     image: "https://images.pexels.com/photos/853199/pexels-photo-853199.jpeg",
//     category: "Electronics",
//     tags: ["portable", "speaker", "waterproof"],
//   },
//   {
//     title: "Cotton T-Shirt - Unisex",
//     description: "Soft and comfortable unisex cotton t-shirt.",
//     price: 19.99,
//     image: "https://images.pexels.com/photos/531321/pexels-photo-531321.jpeg",
//     category: "Fashion",
//     tags: ["cotton", "t-shirt", "unisex"],
//   },
//   {
//     title: "Ceramic Coffee Mug",
//     description: "Handcrafted ceramic mug with unique design.",
//     price: 14.99,
//     image: "https://images.pexels.com/photos/414612/pexels-photo-414612.jpeg",
//     category: "Home",
//     tags: ["ceramic", "coffee mug", "handcrafted"],
//   },
//   {
//     title: "LED Desk Lamp",
//     description: "Adjustable LED desk lamp with touch control.",
//     price: 49.99,
//     image: "https://images.pexels.com/photos/255379/pexels-photo-255379.jpeg",
//     category: "Home",
//     tags: ["LED", "desk lamp", "adjustable"],
//   },
//   {
//     title: "Running Shoes - Men",
//     description: "Lightweight and breathable running shoes for men.",
//     price: 89.99,
//     image: "https://images.pexels.com/photos/1028707/pexels-photo-1028707.jpeg",
//     category: "Sports",
//     tags: ["running shoes", "men", "bre"],
//   },
// ];

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
