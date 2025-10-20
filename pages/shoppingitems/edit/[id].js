import { useRouter } from "next/router";
import useSWR from "swr";
import ShoppingForm from "@/components/ShoppingForm";
import Link from "next/link";
import styled from "styled-components";

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
      mutate()
      router.push("/");
    }
  }

  return (
    <Container>
      <Back href="/">Back</Back>
      <Heading>Edit Shopping Item</Heading>
      <ShoppingForm
        onSubmit={handleSave}
        defaultData={item}
        onCancel={() => router.push("/")}
      />
    </Container>
  );
}
const Container = styled.div`
  max-width: 600px;
  margin: 4rem auto;
  padding: 2rem;
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
`;
const Back = styled(Link)`
  text-decoration: none;
  color: #1a1a1a;
  font-weight: 500;
  font-size: 1rem;
  display: inline-block;
  margin: 1rem 1.5rem;
`;

const Heading = styled.h1`
  font-size: 1.5rem;
  font-weight: 600;
  color: #1a1a1a;
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin: 1.5rem 0;
`;