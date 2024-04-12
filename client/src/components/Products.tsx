import { useEffect, useState } from "react";
import { IProduct, useCart } from "../context/CartContext";
import "../styles/products.css";
import { FaCartPlus } from "react-icons/fa";
import { useUser } from "../context/UserContext";

export const Products = () => {
  const [products, setProducts] = useState<IProduct[]>();
  const [showMessage, setShowMessage] = useState<{ [key: string]: boolean }>(
    {}
  );

  const { addToCart } = useCart();
  const { user } = useUser();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch("http://localhost:3001/products");
      const fetchedData = await response.json();

      const productList: IProduct[] = fetchedData.data.map(
        (product: IProduct) => ({
          ...product,
          price: product.default_price.unit_amount / 100,
        })
      );

      setProducts(productList);
    } catch (error) {
      console.error("An error occured", error);
    }
  };

  const handleAddToCart = (product: IProduct) => {
    if (user) {
      addToCart(product);
      setShowMessage((prevState) => ({ ...prevState, [product.id]: true }));
      setTimeout(
        () =>
          setShowMessage((prevState) => ({
            ...prevState,
            [product.id]: false,
          })),
        3000
      );
    } else {
      setShowMessage((prevState) => ({ ...prevState, [product.id]: true }));
      setTimeout(
        () =>
          setShowMessage((prevState) => ({
            ...prevState,
            [product.id]: false,
          })),
        3000
      );
    }
  };

  return (
    <>
      <h2>Utforska våra produkter</h2>
      <div className="product-container">
        {products?.map((product: IProduct) => (
          <div key={product.id} className="product-item">
            <h3>{product.name}</h3>
            <h4 className="price">{product.price} kr</h4>
            <p>{product.description}</p>
            {product.images &&
              product.images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={product.name}
                  style={{ width: "200px" }}
                />
              ))}
            <button onClick={() => handleAddToCart(product)}>
              <FaCartPlus />
            </button>
            {showMessage[product.id] && (
              <p>
                {user ? "Good Choice! Added to cart.." : "SIGN IN TO SHOP."}{" "}
              </p>
            )}
          </div>
        ))}
      </div>
    </>
  );
};
