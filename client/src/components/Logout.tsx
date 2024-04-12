import { useUser } from "../context/UserContext";

export const Logout = () => {
  const { logout } = useUser();

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
