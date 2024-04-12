import { ChangeEvent, useState } from "react";
import { useUser } from "../context/UserContext";

export const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [registrationMsg, setRegistrationMsg] = useState("");
  const { register } = useUser();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === "email") {
      setEmail(e.target.value);
    } else if (e.target.name === "password") {
      setPassword(e.target.value);
    }
  };

  const registerNewUser = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      await register(email, password);
      setRegistrationMsg("Din användare är skapad");
    } catch (error) {
      console.error("An error occurred", error);
      setRegistrationMsg("Användare redan registrerad");
    }
  };

  return (
    <div>
      <h1>Register</h1>
      <form className="register-wrapper">
        <input
          type="text"
          name="email"
          onChange={handleInputChange}
          value={email}
          placeholder="Skriv in mail eller användarnamn.."
        />

        <input
          type="password"
          name="password"
          onChange={handleInputChange}
          value={password}
          placeholder="Lösenord"
        />
        <button onClick={registerNewUser} className="register">
          Registrera
        </button>
      </form>
      {registrationMsg && <p>{registrationMsg}</p>}
    </div>
  );
};
