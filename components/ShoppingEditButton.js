import Link from "next/link";
import styled from "styled-components";

export default function ShoppingEditButton({ _id }) {
  return <Edit href={`/shoppingitems/edit/${_id}`}>✏️</Edit>;
}
const Edit = styled(Link)`
  text-decoration: none;
  background-color: #cddccbff;
  border-radius: 20px;
  padding: 5px;
`;
