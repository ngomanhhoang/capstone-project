import ShoppingItemList from "@/components/ShoppingItemList";
import useSWR from "swr";
import styled from "styled-components";
export default function HomePage() {
  const { data, error, isLoading } = useSWR("/api/shoppingitems", {
    fallbackData: [],
  });
  if (error) return <div>{error.message}</div>;
  if (isLoading) return <div>loading...</div>;
  console.log(data);
  const counter = data.length
  return (
    <div>
      <Heading>Shopping Buddy</Heading>
      <Counter>Total {counter} items in your shopping list</Counter>
      <ShoppingItemList shoppingData={data} />
    </div>
  );
}

const Heading = styled.h1`
  text-align: center;
`;

const Counter = styled.h2`
  text-align: center;
`
