import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
    console.error("MONGO_URI is not defined in .env file");
    process.exit(1);
}

mongoose.connect(MONGO_URI)
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => {
        console.error("MongoDB connection failed:", err.message);
        process.exit(1);
    });

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true
    },
    password: String
})

const contentSchema = new mongoose.Schema({
    type: String,
    link: String,
    tags: [{ type: mongoose.Schema.Types.ObjectId, ref: "Tag" }],
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
})

const linkSchema = new mongoose.Schema({
    hash: String,
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        unique: true
    }
})

export const userModel = mongoose.model("User", userSchema);
export const contentModel = mongoose.model("Content", contentSchema);
export const linkModel = mongoose.model("Link", linkSchema);