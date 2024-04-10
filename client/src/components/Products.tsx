import { useEffect, useState } from "react";
import { IProduct, useCart } from "../context/CartContext";
import "../styles/products.css";
import { FaCartPlus } from "react-icons/fa";

// interface IProducts {
//   id: string;
//   name: string;
//   description: string;
//   images: string[];
//   price: number;
//   default_price: {
//     unit_amount: number;
//   };
// }

export const Products = () => {
  const [products, setProducts] = useState<IProduct[]>();

  const { addToCart } = useCart(); //hooken  från context

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch("http://localhost:3001/products");
      const fetchedData = await response.json();
      console.log(fetchedData); // vilket data får vi tillbaka?

      const productList: IProduct[] = fetchedData.data.map(
        (product: IProduct) => ({
          ...product,
          price: product.default_price.unit_amount / 100, // Stripe använder cent som standardenhet, så vi delar med 100 för att få priset i SEK
        })
      );

      setProducts(productList);
    } catch (error) {
      console.error("An error occured", error);
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
            <button onClick={() => addToCart(product)}>
              <FaCartPlus />
            </button>
          </div>
        ))}
      </div>
    </>
  );
};
