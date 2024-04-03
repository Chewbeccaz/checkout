export const Payment = () => {
  const handlePayment = async () => {
    const response = await fetch(
      "http://localhost:3001/payments/create-checkout-session",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify([
          {
            product: "price_1P14mpRuDPufONRtFKOWeKCj",
            quantity: 3,
          },
          {
            product: "price_1P14qDRuDPufONRtz3HXjphz",
            quantity: 1,
          },
        ]),
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
