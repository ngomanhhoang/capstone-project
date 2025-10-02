import Link from "next/link";
import styled from "styled-components";

export default function ShoppingDeleteButton({ _id }) {
  return <Delete href={`/shoppingitems/delete/${_id}`}>❌</Delete>;
}

const Delete = styled(Link)`
  text-decoration: none;
  background-color: #cddccbff;
  border-radius: 20px;
  padding: 5px;
`;
