import { useState, useEffect } from "react";
import AddItemForm from "./components/AddItemForm";
import CartList from "./components/CartList";
import Analytics from "./components/Analytics";
import jsPDF from "jspdf";
import "./App.css";

function App() {

  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : [];
  });

  const [history, setHistory] = useState(() => {
    const saved = localStorage.getItem("history");
    return saved ? JSON.parse(saved) : [];
  });

  const [category, setCategory] = useState(
  localStorage.getItem("category") 
);


  const [budget, setBudget] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [activePage, setActivePage] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem("history", JSON.stringify(history));
  }, [history]);

  useEffect(() => {
  localStorage.setItem("category", category);
}, [category]);


  const addItem = (name, price) => {
    if (!price) return;

    const newItem = {
      id: Date.now(),
      name: name || "Item",
      price: Number(price),
      quantity: 1,
    };

    setCart([...cart, newItem]);
  };

  const increaseQty = (id) => {
    setCart(cart.map(item =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    ));
  };

  const decreaseQty = (id) => {
    setCart(cart
      .map(item =>
        item.id === id
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
      .filter(item => item.quantity > 0)
    );
  };

  const removeItem = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const balance = budget ? budget - total : 0;


  // DELETE ALL (OLD CHECKOUT)
  const deleteAll = () => {
  if (cart.length === 0) return;

  const newOrder = {
    id: Date.now(),
    date: new Date().toLocaleString(),
    items: cart,
    total: total,
    category: category
  };

  setHistory([...history, newOrder]);
  setCart([]);
  localStorage.removeItem("category");
  setCategory();
};

  // DELETE HISTORY ITEM
  const deleteHistory = (id) => {
    setHistory(history.filter(order => order.id !== id));
  };

  const exportPDF = () => {
    const doc = new jsPDF();
    doc.text("Purchase Cart Store Bill", 20, 20);
    let y = 40;

    cart.forEach(item => {
      doc.text(`${item.name} - ₹${item.price} x ${item.quantity}`, 20, y);
      y += 10;
    });

    doc.text(`Total: ₹${total}`, 20, y + 10);
    doc.save("bill.pdf");
  };

  return (
    <div className={darkMode ? "container dark" : "container light"}>

      <header className="header">
        <h1 className="main-title">🛒 PURCHASE CART STORE</h1>

        <div>
          <button
            className="dark-toggle"
            onClick={() => setDarkMode(!darkMode)}
          >
            {darkMode ? "Light" : "Dark"}
          </button>


        </div>
        <div>
          <button
            className="menu-btn"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            ☰
          </button>
        </div>


      </header>

      {menuOpen && (
        <nav className="menu">
          <button onClick={() => { setActivePage("home"); setMenuOpen(false); }}>Home</button>
          <button onClick={() => { setActivePage("analysis"); setMenuOpen(false); }}>Spending Analysis</button>
          <button onClick={() => { setActivePage("history"); setMenuOpen(false); }}>Purchase History</button>
          <button onClick={() => { setActivePage("pdf"); setMenuOpen(false); }}>Bill PDF</button>
        </nav>
      )}

      <main>

        {activePage === "home" && (
  <>
    <input
      type="number"
      placeholder="Set Budget"
      value={budget}
      onChange={(e) => setBudget(e.target.value)}
      className="input"
    />

    {budget && total > budget && (
      <div className="warning">⚠ Budget Exceeded</div>
    )}

    <AddItemForm 
   addItem={addItem}
   category={category}
   setCategory={setCategory}
/>


    <CartList
      cart={cart}
      increaseQty={increaseQty}
      decreaseQty={decreaseQty}
      removeItem={removeItem}
    />

    {activePage === "analysis" && (
     <Analysis cart={cart} />
)}


    <div className="total-bar">
      Total ₹ {total}
    </div>


{budget && (
  <div className="balance">
    Balance: ₹{balance}
  </div>
)}



    <button className="delete-small-btn" onClick={deleteAll}>
      Delete All
    </button>
  </>
)}


           {activePage === "analysis" && (
      <Analytics cart={cart} />
)}


        {activePage === "history" && (
          <>
            <h2>Purchase History</h2>

            {history.length === 0 && <p>No purchases yet</p>}

            {history.map(order => (
  <div key={order.id} className="card">
    <p><b>{order.date}</b></p>

    <p style={{color:"#888"}}>Category: {order.category}</p>

    {order.items.map((item, i) => (
      <p key={i}>
        {item.name} - ₹{item.price} x {item.quantity}
      </p>
    ))}

    <p><b>Total: ₹{order.total}</b></p>

    <button
      className="history-delete"
      onClick={() => deleteHistory(order.id)}
    >
      Delete
    </button>
  </div>
))}

      </>
      
      )}

        {activePage === "pdf" && (
          <div className="center">
            <h2>Generate Bill</h2>
            <button className="pdf-btn" onClick={exportPDF}>
              Download PDF
            </button>
          </div>
        )}

      </main>

      <footer className="footer">
        Powered by Harish
      </footer>

    </div>
  );
}

export default App;