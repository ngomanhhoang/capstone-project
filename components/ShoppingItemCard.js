import Link from "next/link";
import { useState } from "react";
import styled from "styled-components";

export default function ShoppingItemCard({ name, category, quantity, id }) {
  return (
    <Article>
      <Info href={`shoppingitems/${id}`}>
        <h3>{name}</h3>
        <Category category={category}>{category.name}</Category>
      </Info>
      <label htmlFor={id}></label>
      <Input value={quantity} id={id} name="quantity" type="number" min={0} />
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
  background-color: ${(props) => props.category.color};
  border: 1px solid #000;
  color: #fff;
  border-radius: 20px;
  padding: 3px;
  text-align: center;
  min-width: 150px;
`;
