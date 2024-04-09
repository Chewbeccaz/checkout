import { Modal } from "@mui/material";
import { useCart } from "../context/CartContext";
import Payment from "./Payment";

export const Cart = ({
  openCart,
  handleOpenCart,
}: {
  openCart: boolean;
  handleOpenCart: () => void;
}) => {
  const { cart } = useCart();

  //I modalen, lägg till en knapp som är kopplad till payment. Ge mig pengar knappen.

  return (
    <Modal
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
        <Payment />
      </div>
    </Modal>
  );
};
