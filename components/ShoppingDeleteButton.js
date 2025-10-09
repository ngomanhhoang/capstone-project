import styled from "styled-components";
import { mutate } from "swr";
export default function ShoppingDeleteButton({ _id }) {
  async function deleteItem() {
    const confirmed = confirm("are you sure you want to delete?");
    if (!confirmed) {
      return;
    }
    const response = await fetch(`/api/shoppingitems/${_id}`, {
      method: "DELETE",
    });
    if (response.ok) {
      mutate(`/api/shoppingitems`);
    }
  }
  return <Delete onClick={deleteItem}>❌</Delete>;
}

const Delete = styled.button`
  align-items: center;
  justify-content: center;
  text-decoration: none;
  background-color: #dc2626;
  color: #ffffff;
  font-size: 0.9rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  border: none;
  cursor: pointer;
`;
