import ShoppingItemList from "@/components/ShoppingItemList";
import ShoppingForm from "@/components/ShoppingForm";
import useSWR from "swr";
import styled from "styled-components";
export default function HomePage() {
  const { data, error, isLoading, mutate } = useSWR("/api/shoppingitems", {
    fallbackData: [],
  });
  if (error) return <div>{error.message}</div>;
  if (isLoading) return <div>loading...</div>;
  const counter = data.length;

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
      <Counter>Total {counter} items in your shopping list</Counter>
      <ShoppingForm onSubmit={addProduct} />

      <ShoppingItemList shoppingData={data} />
    </div>
  );
}

const Heading = styled.h1`
  text-align: center;
`;

const Counter = styled.h2`
  text-align: center;
`;
