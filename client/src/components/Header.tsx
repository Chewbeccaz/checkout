//Jag tänker en knapp med kundvagn, som togglar innehållet i kundvagnen?
//Precis som i förra projektet med login på ikonen.

import { useCart } from "../context/CartContext";
import { FiShoppingCart } from "react-icons/fi";
import "../styles/header.css";

export const Header = () => {
  const { cart } = useCart();

  return (
    <>
      <div className="header">
        <h1>
          Some<span>Webshop</span>
        </h1>
        <div className="cart">
          <FiShoppingCart />
          <div className="cart-count">{cart.length}</div>
        </div>
      </div>
    </>
  );
};
