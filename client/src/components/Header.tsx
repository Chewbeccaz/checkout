import { useCart } from "../context/CartContext";
import { FiShoppingCart } from "react-icons/fi";
import "../styles/header.css";
import { Register } from "./Register";
import { useState } from "react";
import { Cart } from "./Cart";
import Navigation from "./Navigation";
import { useUser } from "../context/UserContext";
import { Login } from "./Login";
import { Logout } from "./Logout";

export const Header = () => {
  const { cart } = useCart();
  const { user } = useUser();
  const [openCart, setOpenCart] = useState<boolean>(false);

  const handleOpenCart = () => {
    setOpenCart(!openCart);
  };

  return (
    <>
      <Navigation />
      <div>
        <h1>{user ? "INLOGGAD: " + user.email : "UTLOGGAD"}</h1>
        <Login />
        <Logout />
      </div>
      <div>{!user && <Register />}</div>

      <div className="header">
        <h1>
          Some<span>Webshop</span>
        </h1>
        {user && (
          <div className="cart" onClick={handleOpenCart}>
            <FiShoppingCart />
            <div className="cart-count">{cart.length}</div>
          </div>
        )}
      </div>

      {user && <Cart openCart={openCart} handleOpenCart={handleOpenCart} />}
    </>
  );
};
