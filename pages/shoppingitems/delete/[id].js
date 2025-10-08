import Link from "next/link";
import { useRouter } from "next/router";
import styled from "styled-components";
import useSWR from "swr";

export default function ShoppingDeleteItem() {
  const router = useRouter();
  const { id } = router.query;

  const { data, isLoading, error } = useSWR(`/api/shoppingitems/${id}`);
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  async function handleDeleteItem() {
    const res = await fetch(`/api/shoppingitems/${id}`, {
      method: "DELETE",
    });
    if (res.ok) {
      router.push("/");
    }
  }

  if (!data) {
    return <p>Please add a new shopping item...</p>;
  }

  return (
    <Container>
      <Back href={"/"}>Back</Back>
      <Heading>Delete Shopping Item</Heading>
      <Message>
        <MessageText>
          Are you sure to delete <strong>{data.name}</strong> ?
        </MessageText>
        <Wrapper>
          <StyledDelete onClick={() => handleDeleteItem(id)} type="button">
            Delete
          </StyledDelete>
          <StyledCancel href={"/"}>Cancel</StyledCancel>
        </Wrapper>
      </Message>
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

const Message = styled.div`
  text-align: center;
  padding: 2rem;
  max-width: 400px;
  margin: 2rem auto;
  background: #f9fafb;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
`;

const MessageText = styled.p`
  font-size: 1rem;
  font-weight: 500;
  color: #1a1a1a;
  margin: 0 0 1.5rem 0;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;

const StyledDelete = styled.button`
  width: 100%;
  max-width: 200px;
  padding: 0.75rem;
  border: none;
  border-radius: 8px;
  background-color: #dc2626;
  color: #ffffff;
  font-size: 0.9rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  cursor: pointer;
`;

const StyledCancel = styled(Link)`
  width: 100%;
  max-width: 200px;
  padding: 0.75rem;
  border: none;
  border-radius: 8px;
  background-color: #6b7280;
  color: #ffffff;
  font-size: 0.9rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  text-align: center;
  text-decoration: none;
  cursor: pointer;
`;
