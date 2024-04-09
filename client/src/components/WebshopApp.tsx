import { useState, useEffect } from "react";
import { Register } from "./Register";
import { Login } from "./Login";
import { Logout } from "./Logout";
import { Products } from "./Products";
import "../styles/webshopapp.css";
import CartProvider from "../context/CartContext";
import { Header } from "./Header";

export const WebshopApp = () => {
  const [user, setUser] = useState<string>("");

  //Authorize gör att vi kan se om användaren är inloggad eller inte
  useEffect(() => {
    const authorize = async () => {
      const response = await fetch("http://localhost:3001/api/auth/authorize", {
        credentials: "include",
      });
      const data = await response.json();
      if (response.status === 200) {
        setUser(data);
      } else {
        setUser("");
      }
    };
    authorize();
  }, []);

  // const register = async () => {
  //   const response = await fetch("http://localhost:3001/api/auth/register", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       email: "fakeemail2£@gmail.fusk",
  //       password: "12345567",
  //     }),
  //   });
  //   const data = await response.json();
  //   console.log(data);
  // };

  return (
    <CartProvider>
      <>
        <Header user={user} />
        {/* kanske lägga nedan inuti headern istället.  */}

        <div className="product-box">
          {" "}
          <Products />{" "}
        </div>
      </>
    </CartProvider>
  );
};

export default WebshopApp;
