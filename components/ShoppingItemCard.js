import styled from "styled-components";
import Link from "next/link";
import ShoppingEditButton from "./ShoppingEditButton";
import ShoppingDeleteButton from "./ShoppingDeleteButton";

export default function ShoppingItemCard({ name, category, quantity, _id, onChange, checked }) {
  return (
    <Article>
      <Checkbox type="checkbox" checked={checked} onChange={onChange}/>
      <Info href={`shoppingitems/${_id}`}>
        <ProductName>{name}</ProductName>
        <Category category={category}>{category.name}</Category>
      </Info>
      <Quantity>{quantity}</Quantity>
      <ShoppingEditButton _id={_id} />
      <ShoppingDeleteButton _id={_id}/>
    </Article>
  );
}

const Info = styled(Link)`
  text-decoration: none;
  color: #1a1a1a;
  font-weight: 500;
`;
const Article = styled.article`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2.5rem;
  padding: 1.5rem;
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  background: #ffffff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
`;

const ProductName = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: #1a1a1a;
  margin: 0;
  letter-spacing: 0.05em;
`;

const Category = styled.h4`
  background-color: ${(props) => props.category.color};
  border: 1px solid #e0e0e0;
  color: #fff;
  border-radius: 12px;
  padding: 0.5rem 1rem;
  text-align: center;
  min-width: 150px;
  font-size: 0.9rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

const Checkbox = styled.input`
  width: 1.5rem;
  height: 1.5rem;
  margin-right: 1rem;
  border: 2px solid #d1d5db;
  border-radius: 4px;
  cursor: pointer;
  transition: border-color 0.3s ease, background-color 0.3s ease;
`;

const Quantity = styled.p`
  font-size: 1rem;
  font-weight: 500;
  color: #1a1a1a;
  margin: 0 1rem;
  min-width: 60px;
  text-align: center;
`;
