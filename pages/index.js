import ShoppingItemList from "@/components/ShoppingItemList";
import ShoppingForm from "@/components/ShoppingForm";
import useSWR from "swr";
import styled from "styled-components";
import useLocalStorageState from "use-local-storage-state";
import ShoppingPurchasedItem from "@/components/ShoppingPurchasedItem";
export default function HomePage() {
  // Mark as purchased
  const [purchasedIds, setPurchasedIds] = useLocalStorageState(
    "purchased-items",
    { defaultValue: [] }
  );

  const {
    data: shoppingItems,
    error,
    isLoading,
    mutate,
  } = useSWR("/api/shoppingitems", {
    fallbackData: [],
  });
  if (error) return <div>{error.message}</div>;
  if (isLoading) return <div>loading...</div>;

  // Mark as purchased
  const unpurchasedItems = shoppingItems.filter(
    (item) => !purchasedIds.includes(item._id)
  );

  const purchasedItems = shoppingItems
    .filter((item) => purchasedIds.includes(item._id))
    .reverse();

  function togglePurchased(id) {
    if (purchasedIds.includes(id)) {
      setPurchasedIds(purchasedIds.filter((pid) => pid !== id));
    } else {
      setPurchasedIds([...purchasedIds, id]);
    }
  }
  const counterUnpurchased = unpurchasedItems.length;
  const counterPurchased = purchasedItems.length;

  async function addProduct(product) {
    const response = await fetch("/api/shoppingitems", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    });
    if (response.ok) {
      mutate();
    }
  }
  return (
    <div>
      <Heading>Shopping Buddy</Heading>

      <ShoppingForm onSubmit={addProduct} />
      <Counter>Total {counterUnpurchased} items in your shopping list</Counter>
      {counterUnpurchased === 0 ? (
        <Message>No items yet</Message>
      ) : (
        <ShoppingItemList
          shoppingData={unpurchasedItems}
          onToggle={togglePurchased}
          purchasedIds={purchasedIds}
        />
      )}

      <Counter>Total {counterPurchased} items in your purchased list</Counter>
      {counterPurchased === 0 ? (
        <Message>No purchased items yet</Message>
      ) : (
        <ShoppingPurchasedItem
          shoppingData={purchasedItems}
          onToggle={togglePurchased}
          purchasedIds={purchasedIds}
        />
      )}
    </div>
  );
}

const Heading = styled.h1`
  text-align: center;
`;

const Counter = styled.h2`
  text-align: center;
`;
const Message = styled.p`
  text-align: center;
`;
