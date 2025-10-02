import dbConnect from "@/db/connect";
import ShoppingItem from "@/db/models/ShoppingItem";

export default async function handler(request, response) {
  await dbConnect();
  const { id } = request.query;

  if (request.method === "GET") {
    const shoppingitems = await ShoppingItem.findById(id).populate("category")
    if (!shoppingitems) {
      return response.status(404).json({ status: "Product not found" });
    }
    return response.status(200).json(shoppingitems);
  }
  if (request.method === "PUT") {
    const shoppingItem = request.body;
    await ShoppingItem.findByIdAndUpdate(id, shoppingItem);
    response.status(200).json({ status: "Shopping Item successfully updated." });
  }

  if (request.method === "DELETE") {
    await ShoppingItem.findByIdAndDelete(id)
    response.status(200).json({ status: "Item successfully deleted." });
  }
  return response.status(405).json({ status: "Method not allowed" });
}
