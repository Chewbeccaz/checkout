import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

export interface ILoggedInUser {
  email: string;
}

export interface IUserContext {
  user: ILoggedInUser | undefined;
  setUser: (user: ILoggedInUser | undefined) => void;
  register: (email: string, password: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  authorize: () => Promise<void>;
}

const initialValues = {
  user: undefined,
  setUser: () => {},
  register: async () => {},
  login: async () => {},
  logout: async () => {},
  authorize: async () => {},
};

export const UserContext = createContext<IUserContext>(initialValues);
export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<ILoggedInUser | undefined>(undefined);

  //*********************************************REGISTER****************************************************
  const register = async (email: string, password: string) => {
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

      if (response.ok) {
        setUser(data);
        console.log("Din användare är skapad");
      } else {
        const errorMessage = await response.text();
        throw new Error(errorMessage);
        console.log("Användare redan registrerad");
      }
    } catch (error: any) {
      console.error("An error with register occured", error);
      throw new Error();
    }
  };

  //*********************************************LOGIN****************************************************

  const login = async (email: string, password: string) => {
    try {
      const response = await fetch("http://localhost:3001/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data);
        window.location.href = "/";
      } else {
        throw new Error("Wrong user or password");
        // setUser(undefined); //tabort?
      }
    } catch (error) {
      console.error("An error with login occured", error);
      throw error;
    }
  };

  //*********************************************LOGOUT****************************************************

  const logout = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });

      if (response.ok) {
        setUser(undefined);
      } else {
        console.log("Utloggning misslyckades(context)");
      }
    } catch (error) {
      console.error("An error with logout occured", error);
    }
  };

  //*********************************************AUTHORIZE****************************************************
  const authorize = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/auth/authorize", {
        credentials: "include",
      });
      if (response.ok) {
        const data = await response.json();

        setUser(data);
      } else {
        setUser(undefined);
      }
    } catch (error) {
      console.error("An error with authorize occured", error);
    }
  };

  useEffect(() => {
    authorize();
  }, []);

  return (
    <UserContext.Provider
      value={{ user, setUser, register, login, logout, authorize }}>
      {children}
    </UserContext.Provider>
  );
};
