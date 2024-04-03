import { useState, useEffect } from "react";
import { Register } from "./Register";

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

  const login = async () => {
    const response = await fetch("http://localhost:3001/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        email: "fakeemail2£@gmail.fusk",
        password: "12345567",
      }),
    });
    const data = await response.json();

    if (response.status === 200) {
      setUser(data);
    } else {
      setUser("");
    }

    console.log(data);
  };

  const logout = async () => {
    const response = await fetch("http://localhost:3001/api/auth/logout", {
      method: "POST",
      credentials: "include",
    });
    if (response.status === 200) {
      setUser("");
    }
  };

  return (
    <>
      <div>
        <h1>{user ? "INLOGGAD: " + user : "UTLOGGAD"}</h1>
        <button onClick={register}>Registrera</button>
        <button onClick={login}>Logga in</button>
        <button onClick={logout}>Logga ut</button>
      </div>
      <div>{!user && <Register />}</div>
    </>
  );
};

export default WebshopApp;
