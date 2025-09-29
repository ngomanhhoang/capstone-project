import mongoose from "mongoose";
import "./Category";

const { Schema } = mongoose;

const shoppingItemSchema = new Schema(
  {
    name: { type: String, required: true },
    quantity: { type: Number, required: true },
    category: { type: Schema.Types.ObjectId, ref: "Category" },
    comment: { type: String, required: true },
    imageUrl: { type: String, required: true },
  },
  {
    timestamps: true, // <-- adds createdAt and updatedAt automatically
  }
);

const ShoppingItem =
  mongoose.models.ShoppingItem ||
  mongoose.model("ShoppingItem", shoppingItemSchema);

export default ShoppingItem;
