import useSWR from "swr";
export default function ShoppingForm({ onSubmit }) {
  const { data, error, isLoading } = useSWR("/api/categories", {
    fallbackData: [],
  });
  if (error) return <div>{error.message}</div>;
  if (isLoading) return <div>loading...</div>;

  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    onSubmit(data);
    event.target.reset();
  }

  return (
    <form onSubmit={handleSubmit}>
      <p>Add shopping item</p>
      <label htmlFor="name">Name</label>
      <input type="text" id="name" name="name" required />
      <label htmlFor="quantity">Quantity</label>
      <input type="number" id="quantity" name="quantity" min={0} required />
      Category
      <select name="category" required defaultValue="">
        <option value="" disabled>
          Please select a category
        </option>
        {data.map((item) => (
          <option key={item._id} value={item._id}>
            {item.name}
          </option>
        ))}
      </select>
      <label htmlFor="imageUrl"></label>
      <input type="hidden" id="imageUrl" name="imageUrl" required />
      <label htmlFor="comment">Comment</label>
      <input type="text" id="comment" name="comment" min={0} />
      <button type="submit">Add</button>
    </form>
  );
}
