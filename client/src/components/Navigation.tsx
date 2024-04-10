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
import { Cart } from "./Cart";

const Navigation = () => {
  const { user, logout } = useUser();
  const { cart } = useCart();
  const [showLoginModal, setShowLoginModal] = useState<boolean>(false);
  const [showRegisterModal, setShowRegisterModal] = useState<boolean>(false);
  const [openCart, setOpenCart] = useState<boolean>(false);
  const [cartQuantity, setCartQuantity] = useState<number>(0);

  // const setLoggedInUser = (user: ILoggedInUser) => {
  //   setUser(user);
  //   setIsLoggedIn(true);
  // };

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

  //  const [user, setUser] = useState<boolean>(false)
  //  const toggleUser = () => {
  //    setUser(!user);
  //  }
  return (
    <nav>
      <ul>
        <li>
          <NavLink to="/">
            <IoHomeOutline />
          </NavLink>
        </li>
        <li>
          {user && (
            <div className="cart" onClick={handleOpenCart}>
              <FiShoppingCart />
              <div className="cart-count">{cartQuantity}</div>
            </div>
          )}
          {user && <Cart openCart={openCart} handleOpenCart={handleOpenCart} />}
        </li>
        <li>
          <button onClick={handleToggleLogin}>
            {user ? "Logga ut" : "Logga in"}
          </button>
        </li>
        {!user && (
          <li>
            <button onClick={handleToggleRegisterModal}>Registrera</button>
          </li>
        )}
      </ul>

      {/* <Modal open={showLoginModal} onClose={handleToggleLoginModal}>
        <Login />
      </Modal>

      <Modal open={showRegisterModal} onClose={handleToggleRegisterModal}>
        <Register />
      </Modal> */}

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
