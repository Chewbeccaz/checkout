import { PropsWithChildren, createContext, useContext, useState } from "react";

export interface ILoggedInUser {
  email?: string;
}
//blev det överflödigt med setUser och setLoggedin nu?
export interface IUserContext {
  user: ILoggedInUser | undefined;
  isLoggedIn: boolean;
  setLoggedInUser: (user: ILoggedInUser | undefined) => void;
  setUser: (user: ILoggedInUser | undefined) => void; //Kanske ta bort denna?
  logout: () => void;
}

const initialValues = {
  user: undefined,
  isLoggedIn: false,
  setLoggedInUser: () => {},
  setUser: () => {},
  logout: () => {},
};

export const UserContext = createContext<IUserContext>(initialValues);
export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<ILoggedInUser | undefined>(undefined);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const setLoggedInUser = (user: ILoggedInUser | undefined) => {
    setUser(user);
    // setIsLoggedIn(true);
    setIsLoggedIn(!!user);
  };

  const logout = async () => {
    setIsLoggedIn(false);
  };

  return (
    <UserContext.Provider
      value={{ user, isLoggedIn, setLoggedInUser, setUser, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
