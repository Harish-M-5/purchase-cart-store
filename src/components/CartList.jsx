import CartItem from "./CartItem";

function CartList({ cart, increaseQty, decreaseQty, removeItem }) {
  return (
    <div className="bg-white p-4 rounded shadow">
      {cart.length === 0 ? (
        <p>No items added</p>
      ) : (
        cart.map(item => (
          <CartItem
            key={item.id}
            item={item}
            increaseQty={increaseQty}
            decreaseQty={decreaseQty}
            removeItem={removeItem}
          />
        ))
      )}
    </div>
  );
}

export default CartList;
