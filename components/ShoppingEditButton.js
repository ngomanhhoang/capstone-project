import Link from "next/link";
import styled from "styled-components";

export default function ShoppingEditButton({ _id }) {
  return <Edit href={`/shoppingitems/edit/${_id}`}>✏️</Edit>;
}
const Edit = styled(Link)`
  align-items: center;
  justify-content: center;
  text-decoration: none;
  background-color: #10b981;
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
