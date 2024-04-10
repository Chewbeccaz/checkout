// import { useEffect, useState } from "react";
// import { Register } from "./Register";
// import { Login } from "./Login";
// import { Logout } from "./Logout";
import { Products } from "./Products";
import "../styles/webshopapp.css";
import CartProvider from "../context/CartContext";
import { Header } from "./Header";
import { UserProvider } from "../context/UserContext";

export const WebshopApp = () => {
  // const [user, setUser] = useState<string>("");
  //Behöver jag ha denna??
  //Dessa två gör ingen skillnad.
  // useEffect(() => {
  //   const authorize = async () => {
  //     const response = await fetch("http://localhost:3001/api/auth/authorize", {
  //       credentials: "include",
  //     });
  //     const data = await response.json();
  //     if (response.status === 200) {
  //       setUser(data);
  //     } else {
  //       setUser("");
  //     }
  //   };
  //   authorize();
  // }, []);
  // const { setLoggedInUser } = useUser();
  // useEffect(() => {
  //   const authorize = async () => {
  //     try {
  //       const response = await fetch(
  //         "http://localhost:3001/api/auth/authorize",
  //         {
  //           credentials: "include",
  //         }
  //       );
  //       if (response.status === 200) {
  //         const data = await response.json();
  //         setLoggedInUser(data);
  //       } else {
  //         setLoggedInUser(undefined);
  //       }
  //     } catch (error) {
  //       console.error("Authorization error:", error);
  //     }
  //   };

  //   authorize();
  // }, []);

  return (
    <UserProvider>
      <CartProvider>
        <>
          <Header />

          <div className="product-box">
            {" "}
            <Products />{" "}
          </div>
        </>
      </CartProvider>
    </UserProvider>
  );
};

export default WebshopApp;
