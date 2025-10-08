import useSWR from "swr";
import styled from "styled-components";

export default function ShoppingCategoryFilter({
  onSelectCategory,
  onClearFilter,
  defaultData,
  selectedCategory,
}) {
  const {
    data: categories,
    error,
    isLoading,
  } = useSWR("/api/categories", {
    fallbackData: [],
  });
  if (error) return <div>{error.message}</div>;
  if (isLoading) return <div>loading...</div>;

  return (
    <Wrapper>
      <StyledSelect
        name="category"
        required
        value={selectedCategory || ""}
        onChange={(e) => onSelectCategory(e.target.value)}
      >
        <option value="" disabled>
          All categories
        </option>
        {categories.map((category) => (
          <option key={category._id} value={category._id}>
            {category.name}
          </option>
        ))}
      </StyledSelect>
      <FilterText>
        Filtering by:{" "}
        {selectedCategory
          ? categories.find((item) => item._id === selectedCategory)?.name
          : "All"}
      </FilterText>
      <Button onClick={onClearFilter} type="button">
        Clear
      </Button>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;
  align-self: center;
  max-width: 400px;
  margin: 1.5rem auto;
  padding: 1rem;
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
`;
const StyledSelect = styled.select`
  height: 2.5rem;
  width: 100%;
  max-width: 200px;
  padding: 0.5rem 1rem;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 1rem;
  background: #ffffff;
`;
const FilterText = styled.p`
  font-size: 0.9rem;
  font-weight: 500;
  color: #1a1a1a;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin: 0;
`;

const Button = styled.button`
  width: 100%;
  max-width: 120px;
  padding: 0.75rem;
  border: none;
  border-radius: 8px;
  background-color: #6b7280;
  color: #ffffff;
  font-size: 0.9rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  cursor: pointer;
`;
