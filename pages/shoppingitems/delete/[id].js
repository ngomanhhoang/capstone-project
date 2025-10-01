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

  async function handleEditItem() {
    const res = await fetch(`/api/shoppingitems/${id}`, {
      method: "DELETE",
    });
    if (res.ok) {
      router.push("/");
    }
  }

  function handleBack() {
    return router.push("/");
  }
  if (!data) {
    return <p>Please add a new shopping item...</p>
  }

  return (
    <>
      <Link href={"/"}>Back</Link>
      <h3>Delete Shopping Item</h3>
      <Message>
        <p>
          Are you sure ?
        </p>
        <div>
          <StyledDelete onClick={() => handleEditItem(id)} type="submit">
            Delete
          </StyledDelete>
          <StyledCancel onClick={handleBack} type="button">
            Cancel
          </StyledCancel>
        </div>
      </Message>
    </>
  );
}

const Message = styled.div`
  text-align: center;
  /* border: 1px solid #000; */
  padding: 2rem;
  max-width: 400px;
  margin: 2rem auto;
`;

const StyledDelete = styled.button`
  width: 250px;
  padding: 0.5rem;
  border: none;
  border-radius: 10px 10px;
  background-color: #bf443bff;
  color: #fff;
  font-weight: bold;
  margin-bottom: 5px;
  &&:hover {
    cursor: pointer;
  }
`;

const StyledCancel = styled.button`
  width: 250px;
  padding: 0.5rem;
  border: none;
  border-radius: 10px 10px;
  background-color: #555555;
  color: #fff;
  font-weight: bold;
  margin-bottom: 5px;
  &&:hover {
    cursor: pointer;
  }
`;
