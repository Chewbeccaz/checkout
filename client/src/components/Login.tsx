import { useState } from "react";
import { useUser } from "../context/UserContext";

export const Login = () => {
  // const [user, setUser] = useState<string>("");
  const { setLoggedInUser } = useUser();
  // const { setUser } = useUser();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const response = await fetch("http://localhost:3001/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });
    const data = await response.json();

    if (response.status === 200) {
      setLoggedInUser(data);
    } else {
      setLoggedInUser(undefined);
    }

    console.log(data);
    console.log("Funkade det att logga in?");
  };

  // return <button onClick={handleLogin}>Logga in</button>;
  return (
    <div>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Logga in</button>
    </div>
  );
};
