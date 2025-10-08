import Link from "next/link";
import styled from "styled-components";

export default function ShoppingDeleteButton({ _id }) {
  return <Delete href={`/shoppingitems/delete/${_id}`}>❌</Delete>;
}

const Delete = styled(Link)`
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
