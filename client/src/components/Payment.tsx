import { useCart } from "../context/CartContext";

export const Payment = () => {
  const { cart } = useCart();
  console.log(cart);

  const handlePayment = async () => {
    console.log("cart 2:", cart);
    const response = await fetch(
      "http://localhost:3001/payments/create-checkout-session",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cart),
        credentials: "include",
      }
    );
    const data = await response.json();
    localStorage.setItem("sessionId", JSON.stringify(data.sessionId));
    window.location = data.url;
  };

  return (
    <div>
      <button onClick={handlePayment}>Gå till betalning</button>
    </div>
  );
};

export default Payment;
