import { useCart } from "../context/CartContext";

import "../styles/header.css";
import { Register } from "./Register";
import { useState } from "react";
import { Cart } from "./Cart";
import Navigation from "./Navigation";
import { useUser } from "../context/UserContext";
// import { Login } from "./Login";
// import { Logout } from "./Logout";

export const Header = () => {
  // const { cart } = useCart();
  const { user } = useUser();
  // const [openCart, setOpenCart] = useState<boolean>(false);

  // const handleOpenCart = () => {
  //   setOpenCart(!openCart);
  // };

  return (
    <>
      <div className="header">
        <div className="logga">
          <h3>WEBSHOP</h3>
        </div>
        <div className="navigation">
          <Navigation />
        </div>

        <div className="header-text">
          <h2>Låt inte dina bilder ligga på ett dammigt usb-minne</h2>
          <button>SHOP NOW</button>
        </div>
      </div>
    </>
  );
};
