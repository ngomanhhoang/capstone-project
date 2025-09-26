import Link from "next/link";
import { useState } from "react";
import styled from "styled-components";

const CATEGORY_COLORS = {
  Dairy: "#4CAF50",
  Bakery: "#FF9800",
  Fruits: "#F44336",
  Vegetables: "#8BC34A",
  Meat: "#9C27B0",
  Beverages: "#03A9F4",
  Snacks: "#FFC107",
  Household: "#795548",
  "Personal Care": "#E91E63",
  Other: "#607D8B",
};

export default function ShoppingItemCard({ name, category, quantity, id }) {
  console.log("category prop:", category);
  const [number, setNumber] = useState(quantity);
  return (
    <Article>
      <Info href={`shoppingitems/${id}`}>
        <h3>{name}</h3>
        <Category category={category}>{category.name}</Category>
      </Info>
      <label htmlFor={id}></label>
      <Input
        onChange={(e) => setNumber(e.target.value)}
        value={number}
        id={id}
        name="quantity"
        type="number"
        min={0}
      />
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
const Input = styled.input`
  height: 2rem;
  width: fit-content;
`;

const Category = styled.h4`
  background-color: ${(props) => CATEGORY_COLORS[props.category.name]};
  border: 1px solid #000;
  color: #fff;
  border-radius: 20px;
  padding: 3px;
  text-align: center;
  min-width: 150px;
`;
