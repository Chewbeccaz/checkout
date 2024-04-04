import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const Navigation = () => {
  const [user, setUser] = useState<boolean>(false);

  const toggleUser = () => {
    setUser(!user);
  };

  return (
    <nav>
      <ul>
        <li>
          <NavLink to="/">Hem</NavLink>
        </li>
        {/* <li>
          <Link to="/produkter">Produkter</Link>
        </li> */}
        <li>
          <NavLink to="/payment">Kundvagn</NavLink>
        </li>
        <li>
          {user ? (
            <button onClick={toggleUser}>Logga ut</button>
          ) : (
            <NavLink to="/login">Logga ut</NavLink>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
