import { ChangeEvent, useState } from "react";

export const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [registrationMsg, setRegistrationMsg] = useState("");

  const registerNewUser = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3001/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      const data = await response.json();
      console.log(data);

      if (response.ok) {
        setRegistrationMsg("Din användare är skapad");
        //Kanske redirecta till login
      } else {
        setRegistrationMsg("Användare redan registrerad");
      }
    } catch (error) {
      console.error("An error occured", error);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === "email") {
      setEmail(e.target.value);
    } else if (e.target.name === "password") {
      setPassword(e.target.value);
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
