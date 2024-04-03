export const Payment = () => {
  const handlePayment = async () => {
    const response = await fetch(
      "http://localhost:3001/payments/create-checkout-session",
      {
        method: "POST",
      }
    );
    const data = await response.json();
    window.location = data.url;
  };

  return (
    <div>
      <button onClick={handlePayment}>GE MIG PENGAR</button>
    </div>
  );
};

export default Payment;
