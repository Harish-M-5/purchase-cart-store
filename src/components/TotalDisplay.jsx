function TotalDisplay({ total }) {
  return (
    <div className="bg-green-500 text-white text-center p-4 rounded text-xl font-bold">
      Total: ₹{total}
    </div>
  );
}

export default TotalDisplay;
