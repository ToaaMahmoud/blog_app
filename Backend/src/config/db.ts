import mongoose from "mongoose";
import { env } from "./env";

export const connectDB = async(): Promise<void> => {
    try {
        await mongoose.connect(env.MONGO_URI);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Failed to connect to MongoDB:", error);
    }
}

mongoose.connection.on("disconnected", () => {
    console.warn("MongoDB connection lost. Attempting to reconnect...");
    connectDB();
})

mongoose.connection.on("error", (err) =>{
    console.error("MongoDB connection error:", err);
})