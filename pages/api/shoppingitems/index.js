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
  console.log("POST DATA:", productData);
  const item = await ShoppingItem.create(productData);
  console.log("CREATED ITEM:", item);
  return response.status(201).json(item);
} catch (error) {
  console.error("POST ERROR:", error);
  return response.status(400).json({ error: error.message });
}

  }
  return response.status(405).json({ status: "Method not allowed" });
}
