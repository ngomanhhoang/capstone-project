import styled from "styled-components";
import useSWR from "swr";
export default function ShoppingForm({ onSubmit }) {
  const { data: categories, error, isLoading } = useSWR("/api/categories", {
    fallbackData: [],
  });
  if (error) return <div>{error.message}</div>;
  if (isLoading) return <div>loading...</div>;

  async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    await onSubmit(data);
    event.target.reset();
  }

  return (
    <Form onSubmit={handleSubmit}>
      <p>Add shopping item</p>
      <InputContainer>
        <label htmlFor="name">Name </label>
        <StyledInput type="text" id="name" name="name" required />
      </InputContainer>
      <InputContainer>
        <label htmlFor="quantity">Quantity </label>
        <StyledInput
          type="number"
          id="quantity"
          name="quantity"
          min={0}
          required
        />
      </InputContainer>
      <InputContainer>
        <StyledCategory>Category</StyledCategory>
        <StyledSelect name="category" required defaultValue="">
          <option value="" disabled>
            Please select a category
          </option>
          {categories.map((category) => (
            <option key={category._id} value={category._id}>
              {category.name}
            </option>
          ))}
        </StyledSelect>
      </InputContainer>
      <div>
        <label htmlFor="imageUrl"></label>
        <input
          type="hidden"
          id="imageUrl"
          name="imageUrl"
          value="https://via.placeholder.com/150"
          required
        />
      </div>

      <InputContainer>
        <label htmlFor="comment">Comment </label>
        <StyledInput type="text" id="comment" name="comment" min={0} />
      </InputContainer>

      <StyledButton type="submit">Add</StyledButton>
    </Form>
  );
}
const Form = styled.form`
  text-align: center;
  max-width: 400px;
  margin: 0 auto;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 1rem auto;
  max-width: 300px;
`;

const StyledInput = styled.input`
  width: 100%;
  padding: 0.5rem;
  box-sizing: border-box;
  margin-top: 5px;
`;

const StyledSelect = styled.select`
  width: 100%;
  padding: 0.5rem;
  box-sizing: border-box;
`;

const StyledButton = styled.button`
  width: 300px;
  padding: 0.5rem;
  border: none;
  border-radius: 10px 10px;
  background-color: #419edcff;
  color: #fff;
  font-weight: bold;
`;
const StyledCategory = styled.p`
  margin-bottom: 0.5rem;
`;
