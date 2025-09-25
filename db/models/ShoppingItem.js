import mongoose from "mongoose";

const { Schema } = mongoose;

const shoppingItemSchema = new Schema({
  name: { type: String, required: true },
  quantity: { type: Number, required: true },
  category: { type: String, required: true },
  comment: { type: String, required: true },
  imageUrl: { type: String, required: true }
});

const ShoppingItem =
  mongoose.models.ShoppingItem || mongoose.model("ShoppingItem", shoppingItemSchema);

export default ShoppingItem;