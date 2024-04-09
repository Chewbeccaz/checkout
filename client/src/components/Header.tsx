//Jag tänker en knapp med kundvagn, som togglar innehållet i kundvagnen?
//Precis som i förra projektet med login på ikonen.

import { useCart } from "../context/CartContext";
import { FiShoppingCart } from "react-icons/fi";
import "../styles/header.css";
import { Login } from "./Login";
import { Logout } from "./Logout";
import { Register } from "./Register";

interface IHeaderProps {
  user: string;
}

export const Header = ({ user }: IHeaderProps) => {
  const { cart } = useCart();

  return (
    <>
      <div>
        <h1>{user ? "INLOGGAD: " + user : "UTLOGGAD"}</h1>
        {!user ? <Login /> : <Logout />}
        {/* <button onClick={register}>Registrera</button> */}
      </div>
      <div>{!user && <Register />}</div>

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
