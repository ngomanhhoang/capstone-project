import dbConnect from "@/db/connect";
import ShoppingItem from "@/db/models/ShoppingItem";

export default async function handler(request, response) {
  await dbConnect();

  if (request.method === "GET") {
    const shoppingitems = await ShoppingItem.find();
    return response.status(200).json(shoppingitems);
  }
  return response.status(405).json({ status: "Method not allowed" });
}
