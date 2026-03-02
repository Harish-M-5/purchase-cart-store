import { useState } from "react";

function AddItemForm({ addItem }) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("General");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!price) return;

    addItem(name, price, category);

    setName("");
    setPrice("");
    setCategory("General");
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow">
      
      {/* Product Name */}
      <input
        type="text"
        placeholder="Product Name (Optional)"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full border p-2 mb-3 rounded"
      />

      {/* Price */}
      <input
        type="number"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        className="w-full border p-2 mb-3 rounded"
        required
      />

      {/* Category Dropdown */}
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="w-full border p-2 mb-3 rounded"
      >
        <option value="General">General</option>
        <option value="Grocery">Grocery</option>
        <option value="Food">Food</option>
        <option value="Dress">Dress</option>
        <option value="Electronics">Electronics</option>
        <option value="Travel">Travel</option>
      </select>

      {/* Submit Button */}
      <button className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition">
        Add Item
      </button>
    </form>
  );
}

export default AddItemForm;
