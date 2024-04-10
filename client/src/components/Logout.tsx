import { useState } from "react";
import { useUser } from "../context/UserContext";

export const Logout = () => {
  // const [user, setUser] = useState<string>("");
  const { logout } = useUser();

  // const handleLogout = async () => {
  //   const response = await fetch("http://localhost:3001/api/auth/logout", {
  //     method: "POST",
  //     credentials: "include",
  //   });
  //   if (response.status === 200) {
  //     setUser("");
  //   }
  // };
  const handleLogout = async () => {
    try {
      await logout();
      console.log("Funkade det att logga ut?");
    } catch (error) {
      console.error("An error occurred during logout", error);
    }
  };

  return <button onClick={handleLogout}>Logga ut</button>;
};
