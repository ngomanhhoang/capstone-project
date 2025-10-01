import styled from "styled-components";
import Link from "next/link";
import ShoppingEditButton from "./ShoppingEditButton";
import ShoppingDeleteButton from "./ShoppingDeleteButton";

export default function ShoppingItemCard({ name, category, quantity, _id }) {
  return (
    <Article>
      <Info href={`shoppingitems/${_id}`}>
        <h3>{name}</h3>
        <Category category={category}>{category.name}</Category>
      </Info>
      <p>{quantity}</p>
      <ShoppingEditButton _id={_id} />
      <ShoppingDeleteButton _id={_id}/>
    </Article>
  );
}

const Info = styled(Link)`
  text-decoration: none;
  color: #000;
`;
const Article = styled.article`
  display: flex;
  justify-content: space-around;
  margin-bottom: 2rem;
  align-items: center;
  border: 1px solid #000;
  border-radius: 20px;
`;

const Category = styled.h4`
  background-color: ${(props) => props.category.color};
  color: #fff;
  border-radius: 10px 10px;
  padding: 5px 20px;
  text-align: center;
`;
