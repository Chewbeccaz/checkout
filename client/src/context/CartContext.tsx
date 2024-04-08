import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

export interface IProduct {
  id: string;
  name: string;
  price: number;
  description: string;
  images: string[];
  default_price: {
    unit_amount: number;
  };
}

interface ICartItem {
  product: IProduct;
  quantity: number;
}

interface ICartContext {
  cart: ICartItem[];
  addToCart: (product: IProduct) => void;
}

const initialValues = {
  cart: [],
  addToCart: () => {},
};

//Observera att man kanske även vill lägga till decrease from cart eller quantity-funktioner här också.

const CartContext = createContext<ICartContext>(initialValues);
export const useCart = () => useContext(CartContext);

const CartProvider = ({ children }: PropsWithChildren) => {
  const [cart, setCart] = useState<ICartItem[]>(() => {
    const isData = localStorage.getItem("cart");
    return isData ? JSON.parse(isData) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: IProduct) => {
    const clonedCart = [...cart];

    const productAlreadyExists = clonedCart.find(
      (item) => item.product.id === product.id
    );

    if (productAlreadyExists) {
      productAlreadyExists.quantity++;
      setCart(clonedCart);
    } else {
      setCart([...cart, { product, quantity: 1 }]);
    }
  };

  return (
    <CartContext.Provider value={{ cart, addToCart }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
