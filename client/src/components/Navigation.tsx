import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useUser } from "../context/UserContext";
import { Box, Modal, Typography } from "@mui/material";
import { Login } from "./Login";
import { Register } from "./Register";
import "../styles/navigation.css";
import { IoHomeOutline } from "react-icons/io5";
import { useCart } from "../context/CartContext";
import { FiShoppingCart } from "react-icons/fi";
import { IoPersonAddSharp } from "react-icons/io5";
import { CiLogin } from "react-icons/ci";
import { CiLogout } from "react-icons/ci";

import { Cart } from "./Cart";

const Navigation = () => {
  const { user, logout } = useUser();
  const { cart } = useCart();
  const [showLoginModal, setShowLoginModal] = useState<boolean>(false);
  const [showRegisterModal, setShowRegisterModal] = useState<boolean>(false);
  const [openCart, setOpenCart] = useState<boolean>(false);
  const [cartQuantity, setCartQuantity] = useState<number>(0);

  useEffect(() => {
    const totalQuantity = cart.reduce(
      (total, item) => total + item.quantity,
      0
    );
    setCartQuantity(totalQuantity);
  }, [cart]);

  const handleToggleLoginModal = () => {
    setShowLoginModal(!showLoginModal);
  };

  const handleToggleRegisterModal = () => {
    setShowRegisterModal(!showRegisterModal);
  };

  const handleLogout = async () => {
    await logout();
    console.log("Funkade det att logga ut?");
  };

  const handleToggleLogin = () => {
    if (user) {
      handleLogout();
    } else {
      handleToggleLoginModal();
    }
  };

  const handleOpenCart = () => {
    setOpenCart(!openCart);
  };

  return (
    <nav>
      <ul>
        <li>
          <h4>{user ? "Välkommen " + user : "UTLOGGAD"}</h4>
        </li>

        <li>
          <button className="icon">
            <NavLink to="/">
              <IoHomeOutline />
            </NavLink>
            <p>Hem</p>
          </button>
        </li>

        {user && (
          <li>
            <button className="icon" onClick={handleOpenCart}>
              <div className="cart">
                <FiShoppingCart />

                <div className="cart-count">{cartQuantity}</div>
              </div>
              <p>Kundkorg</p>
              <Cart openCart={openCart} handleOpenCart={handleOpenCart} />
            </button>
          </li>
        )}

        <li>
          <button onClick={handleToggleLogin} className="icon">
            {user ? (
              <>
                <CiLogout />
                <p>Logga ut</p>
              </>
            ) : (
              <>
                <CiLogin />
                <p>Logga in</p>
              </>
            )}
          </button>
        </li>

        {!user && (
          <li>
            <button onClick={handleToggleRegisterModal} className="icon">
              <IoPersonAddSharp />
              <p>Registera</p>
            </button>
          </li>
        )}
      </ul>

      <Modal open={showLoginModal} onClose={handleToggleLoginModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
          }}>
          <Typography variant="h5" gutterBottom>
            Logga in
          </Typography>
          <Login />
        </Box>
      </Modal>

      <Modal open={showRegisterModal} onClose={handleToggleRegisterModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
          }}>
          <Typography variant="h5" gutterBottom>
            Registrera
          </Typography>
          <Register />
        </Box>
      </Modal>
    </nav>
  );
};

export default Navigation;
