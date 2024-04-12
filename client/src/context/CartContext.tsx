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
  decreaseQuantity: (product: IProduct) => void;
  removeFromCart: (product: IProduct) => void;
}

const initialValues = {
  cart: [],
  addToCart: () => {},
  decreaseQuantity: () => {},
  removeFromCart: () => {},
};

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

  const decreaseQuantity = (product: IProduct) => {
    const clonedCart = cart.map((item) => {
      if (item.product.id === product.id) {
        return {
          ...item,
          quantity: item.quantity > 1 ? item.quantity - 1 : 1,
        };
      }
      return item;
    });
    setCart(clonedCart);
  };

  const removeFromCart = (product: IProduct) => {
    const clonedCart = cart.filter((item) => item.product.id !== product.id);
    setCart(clonedCart);
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, decreaseQuantity }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
