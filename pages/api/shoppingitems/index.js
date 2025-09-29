import dbConnect from "@/db/connect";
import ShoppingItem from "@/db/models/ShoppingItem";

export default async function handler(request, response) {
  await dbConnect();

  if (request.method === "GET") {
    const shoppingitems = await ShoppingItem.find()
      .sort({ createdAt: -1 })
      .populate("category");
    return response.status(200).json(shoppingitems);
  }

  if (request.method === "POST") {
    try {
      const productData = request.body;
      await ShoppingItem.create(productData);
      return response.status(201).json({ status: "Product created" });
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }
  return response.status(405).json({ status: "Method not allowed" });
}
