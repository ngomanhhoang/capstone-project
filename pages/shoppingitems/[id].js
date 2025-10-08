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
    <Container>
      <Back href={"/"}>Back</Back>
      <Heading>Product Detail</Heading>
      <Info>
        <StyledImage
          src={product.imageUrl}
          width={200}
          height={200}
          alt={product.name}
        ></StyledImage>

        <ProductName>{product.name}</ProductName>
        <CategoryDetail color={product.category?.color}>
          {product.category?.name}
        </CategoryDetail>
        <Quantity>{product.quantity}</Quantity>
      </Info>

      <Comment>
        <CommentText>{product.comment}</CommentText>
      </Comment>
    </Container>
  );
}

const Container = styled.div`
  max-width: 600px;
  margin: 4rem auto;
  padding: 2rem;
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
`;
const Back = styled(Link)`
  text-decoration: none;
  color: #1a1a1a;
  font-weight: 500;
  font-size: 1rem;
  display: inline-block;
  margin: 1rem 1.5rem;
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  margin-top: 2rem;
  padding: 1.5rem;
  background: #f9fafb;
  border-radius: 8px;
`;

const StyledImage = styled(Image)`
  border-radius: 12px;
  object-fit: cover;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;
const ProductName = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: #1a1a1a;
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

const Quantity = styled.p`
  font-size: 1rem;
  font-weight: 500;
  color: #1a1a1a;
  margin: 0;
`;

const Comment = styled.div`
  margin-top: 2rem;
  padding: 1rem;
  background: #f9fafb;
  border-radius: 8px;
  text-align: center;
`;
const CommentText = styled.p`
  font-size: 1rem;
  font-weight: 400;
  color: #1a1a1a;
  margin: 0;
`;
const CategoryDetail = styled.h4`
  background-color: ${(props) => props.color};
  border: 1px solid #e0e0e0;
  color: #fff;
  border-radius: 12px;
  padding: 0.5rem 1rem;
  font-size: 0.9rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

const Heading = styled.h1`
  font-size: 1.5rem;
  font-weight: 600;
  color: #1a1a1a;
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin: 1.5rem 0;
`;
