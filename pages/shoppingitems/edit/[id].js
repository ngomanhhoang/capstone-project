import { useRouter } from "next/router";
import useSWR from "swr";
import ShoppingForm from "@/components/ShoppingForm";
import Link from "next/link";

export default function ShoppingEditPage() {
  const router = useRouter();
  const { id } = router.query;

  const {
    data: item,
    error,
    isLoading,
    mutate,
  } = useSWR(`/api/shoppingitems/${id}`);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading item</p>;

  async function handleSave(shoppingItem) {
    const res = await fetch(`/api/shoppingitems/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(shoppingItem),
    });
    if (res.ok) {
      mutate();
      router.push("/");
    }
  }

  return (
    <div>
      <Link href="/">Back</Link>
      <h1>Edit Shopping Item</h1>
      <ShoppingForm
        onSubmit={handleSave}
        defaultData={item}
        onCancel={() => router.push("/")}
      />
    </div>
  );
}
