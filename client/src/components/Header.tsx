//Jag tänker en knapp med kundvagn, som togglar innehållet i kundvagnen?
//Precis som i förra projektet med login på ikonen.

import { useCart } from "../context/CartContext";
import { FiShoppingCart } from "react-icons/fi";
import "../styles/header.css";
import { Login } from "./Login";
import { Logout } from "./Logout";
import { Register } from "./Register";
import { useState } from "react";
import { Cart } from "./Cart";

interface IHeaderProps {
  user: string;
}

export const Header = ({ user }: IHeaderProps) => {
  const { cart } = useCart();
  const [openCart, setOpenCart] = useState<boolean>(false);

  const handleOpenCart = () => {
    setOpenCart(!openCart);
  };

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
        <div className="cart" onClick={handleOpenCart}>
          <FiShoppingCart />
          <div className="cart-count">{cart.length}</div>
        </div>
      </div>

      <Cart openCart={openCart} handleOpenCart={handleOpenCart} />

      {/* <Modal
        open={openCart}
        onClose={handleOpenCart}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <div style={{ backgroundColor: "white", padding: 20 }}>
          {cart.map((item, index) => (
            <div key={index}>
              <h4>{item.product.name}</h4>
              <p>Price: {item.product.price}</p>
              <p>Quantity: {item.quantity}</p>
            </div>
          ))}
        </div>
      </Modal> */}
    </>
  );
};
