import { ChangeEvent, useState } from "react";
import { useUser } from "../context/UserContext";
import "../styles/register.css";

export const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [registrationMsg, setRegistrationMsg] = useState("");
  const [error, setError] = useState("");
  const { register } = useUser();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === "email") {
      setEmail(e.target.value);
    } else if (e.target.name === "password") {
      setPassword(e.target.value);
    }
  };

  const registerNewUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await register(email, password);
      setRegistrationMsg("Din användare är skapad");
      setError("");
    } catch (error: any) {
      console.error("An error occurred", error);
      setRegistrationMsg("Användare redan registrerad");
      setError(error.message);
    }
  };

  return (
    <div>
      <h1>Register</h1>
      <form className="register-wrapper" onSubmit={registerNewUser}>
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
        <button type="submit" className="register">
          Registrera
        </button>
      </form>
      {registrationMsg && <p>{registrationMsg}</p>}
      {error && <p>{error}</p>}
    </div>
  );
};
