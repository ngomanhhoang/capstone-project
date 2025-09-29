import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import useSWR from "swr";
import styled from "styled-components";
export default function ProductDetails() {
  const router = useRouter();
  const { isReady } = router;
  const { id } = router.query;

  const {
    data: product,
    isLoading,
    error,
  } = useSWR(`/api/shoppingitems/${id}`);

  if (!isReady || isLoading || error) return <h2>Loading...</h2>;

  return (
    <>
      <Back href={"/"}>back</Back>
      <Heading>Product Detail</Heading>
      <Info>
        <Image
          src={product.imageUrl}
          width={200}
          height={200}
          alt={product.name}
        ></Image>

        <h3>{product.name}</h3>
        <CategoryDetail color={product.category?.color}>{product.category?.name}</CategoryDetail>
        <p>{product.quantity}</p>
      </Info>

      <Comment>
        <p>{product.comment}</p>
      </Comment>
    </>
  );
}
const Back = styled(Link)`
  text-decoration: none;
  color: #000;
  margin: 20px;
`;

const Info = styled.div`
  text-align: center;
  margin-top: 3rem;
`;

const Comment = styled.div`
  text-align: center;
  margin-top: 3rem;
`;
const CategoryDetail = styled.h4`
  background-color: ${(props) => props.color};
  display: inline-block;
  border: 1px solid #000;
  color: #fff;
  border-radius: 20px;
  padding: 5px 15px;
`;

const Heading = styled.span`
  font-size: large;
  font-weight: bold;
`
