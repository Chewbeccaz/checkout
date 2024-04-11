import { Modal } from "@mui/material";
import { useCart } from "../context/CartContext";
import Payment from "./Payment";
import { FaRegTrashAlt } from "react-icons/fa";

export const Cart = ({
  openCart,
  handleOpenCart,
}: {
  openCart: boolean;
  handleOpenCart: () => void;
}) => {
  const { cart, addToCart, removeFromCart, decreaseQuantity } = useCart();

  const calculateTotal = () => {
    let total = 0;
    cart.forEach((item) => {
      total += item.product.price * item.quantity;
    });
    return total;
  };

  const handleIncrement = (productId: string) => {
    const product = cart.find((item) => item.product.id === productId);
    if (product) {
      addToCart(product.product);
    }
  };

  const handleDecrement = (productId: string) => {
    const product = cart.find((item) => item.product.id === productId);
    if (product && product.quantity > 1) {
      decreaseQuantity(product.product);
    }
  };

  const handleRemoveItem = (productId: string) => {
    const product = cart.find((item) => item.product.id === productId);
    if (product) {
      removeFromCart(product.product);
    }
  };

  return (
    <Modal
      open={openCart}
      onClose={handleOpenCart}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      style={{
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "flex-start",
      }}>
      <div
        style={{
          backgroundColor: "white",
          padding: "20px",
          width: "300px",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
          borderRadius: "8px",
          maxHeight: "80vh",
          overflowY: "auto",
        }}>
        <button
          onClick={handleOpenCart}
          style={{
            border: "none",
            background: "none",
            cursor: "pointer",
            position: "absolute",
            top: "10px",
            right: "10px",
            fontSize: "16px",
            color: "#666",
          }}>
          X
        </button>
        <h2 style={{ color: "purple" }}>Kundvagn:</h2>
        <h3>Artiklar:</h3>
        <div style={{ marginBottom: "20px" }}>
          {cart.map((item) => (
            <div key={item.product.id} style={{ marginBottom: "10px" }}>
              <hr style={{ marginBottom: "20px" }} />
              <img
                src={item.product.images[0]}
                alt={item.product.name}
                style={{ width: "100px", marginRight: "10px" }}
              />
              <div>
                <h4 style={{ fontSize: "16px", marginBottom: "2px" }}>
                  {item.product.name}
                </h4>
                <p style={{ fontSize: "12px", marginBottom: "2px" }}>
                  Pris: {item.product.price} kr
                </p>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDecrement(item.product.id);
                    }}
                    style={{
                      marginLeft: "5px",
                      padding: "5px 10px",
                      fontSize: "12px",
                    }}>
                    -
                  </button>
                  <p
                    style={{
                      marginRight: "5px",
                      padding: "5px 10px",
                      fontSize: "12px",
                    }}>
                    Antal: {item.quantity}
                  </p>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleIncrement(item.product.id);
                    }}
                    style={{
                      marginRight: "5px",
                      padding: "5px 10px",
                      fontSize: "12px",
                    }}>
                    +
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveItem(item.product.id);
                    }}
                    style={{
                      marginLeft: "5px",
                      padding: "5px 10px",
                      fontSize: "14px",
                      backgroundColor: "transparent",
                      border: "none",
                      cursor: "pointer",
                      color: "red",
                    }}>
                    <FaRegTrashAlt />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <h3>Total: {calculateTotal()} kr</h3>
        <Payment />
      </div>
    </Modal>
  );
};
