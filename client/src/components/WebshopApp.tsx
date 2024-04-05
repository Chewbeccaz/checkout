import { useState, useEffect } from "react";
import { Register } from "./Register";
import { Login } from "./Login";
import { Logout } from "./Logout";
import { Products } from "./Products";
import "../styles/webshopapp.css";

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

  const register = async () => {
    const response = await fetch("http://localhost:3001/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: "fakeemail2£@gmail.fusk",
        password: "12345567",
      }),
    });
    const data = await response.json();
    console.log(data);
  };

  return (
    <>
      <div>
        <h1>{user ? "INLOGGAD: " + user : "UTLOGGAD"}</h1>
        {!user ? <Login /> : <Logout />}
        <button onClick={register}>Registrera</button>
      </div>
      <div>{!user && <Register />}</div>
      <div className="product-box">
        {" "}
        <Products />{" "}
      </div>
    </>
  );
};

export default WebshopApp;
