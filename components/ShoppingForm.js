import styled from "styled-components";
import useSWR from "swr";
export default function ShoppingForm({ onSubmit, defaultData, onCancel }) {
  const {
    data: categories,
    error,
    isLoading,
  } = useSWR("/api/categories", {
    fallbackData: [],
  });
  if (error) return <div>{error.message}</div>;
  if (isLoading) return <div>loading...</div>;

  async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    await onSubmit(data);
    if (!defaultData) event.target.reset();
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormTitle>{defaultData ? "Edit shopping item" : "Add shopping item"}</FormTitle>
      <InputContainer>
        <label htmlFor="name">Name </label>
        <StyledInput
          type="text"
          id="name"
          name="name"
          required
          defaultValue={defaultData?.name}
        />
      </InputContainer>
      <InputContainer>
        <label htmlFor="quantity">Quantity </label>
        <StyledInput
          type="number"
          id="quantity"
          name="quantity"
          min={0}
          required
          defaultValue={defaultData?.quantity}
        />
      </InputContainer>
      <InputContainer>
        <StyledCategory>Category</StyledCategory>
        <StyledSelect
          name="category"
          required
          defaultValue={defaultData?.category?._id || ""}
        >
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
          value={defaultData?.imageUrl || "https://img.rewe-static.de/9928239/46040366_digital-image.png?impolicy=s-products&imwidth=1080"}
        />
      </div>

      <InputContainer>
        <label htmlFor="comment">Comment </label>
        <StyledInput
          type="text"
          id="comment"
          name="comment"
          min={0}
          defaultValue={defaultData?.comment}
        />
      </InputContainer>

      <StyledButton type="submit">{defaultData ? "Edit" : "Add"}</StyledButton>
      {onCancel && (
        <StyledCancel type="button" onClick={onCancel}>
          Cancel
        </StyledCancel>
      )}
    </Form>
  );
}
const Form = styled.form`
  max-width: 400px;
  margin: 4rem auto;
  padding: 2rem;
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  text-align: center;
`;
const FormTitle = styled.p`
  font-size: 1.25rem;
  font-weight: 600;
  color: #1a1a1a;
  margin-bottom: 1.5rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 1.5rem auto;
  max-width: 300px;
`;

const StyledInput = styled.input`
  height: 2.5rem;
  width: 100%;
  padding: 0.5rem 1rem;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 1rem;
`;

const StyledSelect = styled.select`
  height: 2.5rem;
  width: 100%;
  padding: 0.5rem 1rem;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 1rem;
  background: #ffffff;
`;

const StyledButton = styled.button`
  width: 100%;
  max-width: 300px;
  padding: 0.75rem;
  border: none;
  border-radius: 8px;
  background-color: #007bff;
  color: #ffffff;
  font-size: 1rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  &&:hover {
    cursor: pointer;
  }
`;
const StyledCategory = styled.p`
  margin: 0;
`;

const StyledCancel = styled.button`
   width: 100%;
  max-width: 300px;
  margin-top: 0.5rem;
  padding: 0.75rem;
  border: none;
  border-radius: 8px;
  background-color: #6b7280;
  color: #ffffff;
  font-size: 1rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  &&:hover {
    cursor: pointer;
  }
`;
