function CartItem({ item, increaseQty, decreaseQty, removeItem }) {
  return (
    <div className="flex justify-between items-center border-b py-2">
      <div>
        <h3 className="font-semibold">{item.name}</h3>
        <p>₹{item.price} × {item.quantity}</p>
      </div>

      
  <div className="flex items-center gap-2">

  <button
    onClick={() => decreaseQty(item.id)}
    className="bg-gradient-to-r from-red-400 to-red-600 text-white w-8 h-8 rounded-full font-bold shadow hover:scale-110 transition"
  >
    -
  </button>

  <span className="font-semibold text-lg">
    {item.quantity}
  </span>

  <button
    onClick={() => increaseQty(item.id)}
    className="bg-gradient-to-r from-green-400 to-green-600 text-white w-8 h-8 rounded-full font-bold shadow hover:scale-110 transition"
  >
    +
  </button>

  <button
    onClick={() => removeItem(item.id)}
    className="bg-black text-white px-2 py-1 rounded hover:bg-gray-700"
  >
    X
  </button>

</div>

    </div>
  );
}

export default CartItem;
