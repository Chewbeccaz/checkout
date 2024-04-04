import { useState } from "react";

export const Logout = () => {
  const [user, setUser] = useState<string>("");

  const handleLogout = async () => {
    const response = await fetch("http://localhost:3001/api/auth/logout", {
      method: "POST",
      credentials: "include",
    });
    if (response.status === 200) {
      setUser("");
    }
  };

  return <button onClick={handleLogout}>Logga ut</button>;
};
