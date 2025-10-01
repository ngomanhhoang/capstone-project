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
      <p>{defaultData ? "Edit shopping item" : "Add shopping item"}</p>
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
          value={defaultData?.imageUrl || "https://via.placeholder.com/150"}
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
  margin-bottom: 5px;
`;
const StyledCategory = styled.p`
  margin-bottom: 0.5rem;
`;

const StyledCancel = styled.button`
  width: 300px;
  padding: 0.5rem;
  border: none;
  border-radius: 10px 10px;
  background-color: #555555;
  color: #fff;
  font-weight: bold;
  margin-bottom: 5px;
`;
