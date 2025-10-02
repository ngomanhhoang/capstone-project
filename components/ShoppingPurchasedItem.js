import ShoppingItemCard from "./ShoppingItemCard";
import styled from "styled-components";
export default function ShoppingPurchasedItem({
  shoppingData,
  onToggle,
  purchasedIds,
}) {
  return (
    <Wrapper>
      {shoppingData.map((item) => {
        return (
          <Item key={item._id}>
            <ShoppingItemCard
              name={item.name}
              category={item.category}
              quantity={item.quantity}
              comment={item.comment}
              _id={item._id}
              checked={purchasedIds.includes(item._id)}
              onChange={() => onToggle(item._id)}
            />
          </Item>
        );
      })}
    </Wrapper>
  );
}
const Wrapper = styled.ul`
  min-width: 400px;
  list-style-type: none;
  margin: 0 3rem;
  padding: 0;
`;

const Item = styled.li`
  position: relative;
  background-color: gray;
  border-radius: 20px;

  &::after {
    content: "";
    position: absolute;
    top: 50%;
    width: 100%;
    height: 2px;
    background-color: red;
  }
`;
