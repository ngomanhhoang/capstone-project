import ShoppingItemCard from "./ShoppingItemCard";
import styled from "styled-components";
export default function ShoppingItemList({ shoppingData, onToggle,purchasedIds, isPurchased }) {
  return (
    <List>
      {shoppingData.map((item) => {
        return (
          <li key={item._id}>
            <ShoppingItemCard
              name={item.name}
              category={item.category}
              quantity={item.quantity}
              comment={item.comment}
              _id={item._id}
              checked={purchasedIds.includes(item._id)}
              onChange = {() => onToggle(item._id)}
              isPurchased={purchasedIds.includes(item._id)}
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
  margin: 4rem 2rem;
  padding: 0;
  gap: 1rem;
  background: #f9fafb;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
`;
