import { Products } from "./Products";
import "../styles/webshopapp.css";
import CartProvider from "../context/CartContext";
import { Header } from "./Header";
import { UserProvider } from "../context/UserContext";

export const WebshopApp = () => {
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
