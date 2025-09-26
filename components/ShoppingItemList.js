
import ShoppingItemCard from "./ShoppingItemCard";
import styled from "styled-components";
export default function ShoppingItemList({ shoppingData }) {
  return (
      <List>
        {shoppingData.map((item) => {
          return (
            <li key={item._id}>
              <ShoppingItemCard
                name={item.name}
                category={item.category}
                quantity={item.quantity}
                id={item._id}
              />
            </li>
          );
        })}
      </List>
  );
}

const List = styled.ul`
  min-width: 400px;
  list-style-type: none;
  margin: 5rem 3rem;
  padding: 0;
`;
