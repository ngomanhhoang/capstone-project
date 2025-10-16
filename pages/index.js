import ShoppingItemList from "@/components/ShoppingItemList";
import ShoppingForm from "@/components/ShoppingForm";
import useSWR from "swr";
import styled from "styled-components";
import useLocalStorageState from "use-local-storage-state";
import ShoppingCategoryFilter from "@/components/ShoppingCategoryFilter";
import { useState } from "react";
export default function HomePage() {
  // Mark as purchased
  const [purchasedIds, setPurchasedIds] = useLocalStorageState(
    "purchased-items",
    { defaultValue: [] }
  );
  const [selectedCategory, setSelectedCategory] = useState(null);

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

  const purchasedItems = purchasedIds
    .map((id) => shoppingItems.find((item) => item._id === id))
    .filter((item) => item !== undefined && item !== null) // remove undefined if any
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

  // Filter items
  const filteredItems = selectedCategory
    ? unpurchasedItems.filter((item) => item.category._id === selectedCategory)
    : unpurchasedItems;
  return (
    <div>
      <Heading>Shopping Buddy</Heading>

      <ShoppingForm onSubmit={addProduct} />
      <Counter>Total {counterUnpurchased} items in your shopping list</Counter>
      <ShoppingCategoryFilter
        selectedCategory={selectedCategory}
        onSelectCategory={(category) => setSelectedCategory(category)}
        onClearFilter={() => setSelectedCategory(null)}
        defaultData={unpurchasedItems}
      />
      {counterUnpurchased === 0 ? (
        <Message>No items yet</Message>
      ) : filteredItems.length === 0 ? (
        <Message>No items match the selected category</Message>
      ) : (
        <ShoppingItemList
          shoppingData={filteredItems}
          onToggle={togglePurchased}
          purchasedIds={purchasedIds}
        />
      )}

      <Counter>Total {counterPurchased} items in your purchased list</Counter>
      {counterPurchased === 0 ? (
        <Message>No purchased items yet</Message>
      ) : (
        <ShoppingItemList
          shoppingData={purchasedItems}
          onToggle={togglePurchased}
          purchasedIds={purchasedIds}
          isPurchased={true}
        />
      )}
    </div>
  );
}

const Heading = styled.h1`
  font-size: 1.75rem;
  font-weight: 600;
  color: #1a1a1a;
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin: 1.5rem 0;
`;

const Counter = styled.h2`
  font-size: 1.25rem;
  font-weight: 500;
  color: #1a1a1a;
  text-align: center;
  margin: 2rem 0 1rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;
const Message = styled.p`
  font-size: 1rem;
  font-weight: 500;
  color: #1a1a1a;
  text-align: center;
  margin: 2rem 0;
  padding: 1rem;
  background: #f9fafb;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
`;
