import { useCart } from "../context/CartContext";

export const Payment = () => {
  const { cart } = useCart();
  console.log(cart);

  const handlePayment = async () => {
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
      <button
        onClick={handlePayment}
        style={{
          backgroundColor: "purple",
          color: "white",
          border: "none",
          padding: "10px 20px",
          borderRadius: "5px",
          cursor: "pointer",
        }}>
        Gå till betalning
      </button>
    </div>
  );
};

export default Payment;
