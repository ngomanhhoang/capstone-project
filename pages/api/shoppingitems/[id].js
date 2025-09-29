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
  return response.status(405).json({ status: "Method not allowed" });
}
