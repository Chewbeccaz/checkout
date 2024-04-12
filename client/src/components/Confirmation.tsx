import { useEffect, useState } from "react";

export const Confirmation = () => {
  const [verified, setVerified] = useState(false);
  const [isloading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!verified) {
      const verifySession = async () => {
        let sessionId;
        const dataLS = localStorage.getItem("sessionId");

        if (dataLS) {
          sessionId = JSON.parse(dataLS);
        }

        const response = await fetch(
          "http://localhost:3001/payments/verify-session",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ sessionId }),
          }
        );

        const data = await response.json();

        if (response.ok) {
          setVerified(true);
          setIsLoading(false);
          localStorage.removeItem("sessionId");
          localStorage.removeItem("cart");
        }
      };
      verifySession();
    }
  }, [verified]);

  return (
    <div>
      <h1>{verified && !isloading ? "Tack för ditt köp! 💸" : "LOADING..."}</h1>
    </div>
  );
};

export default Confirmation;
